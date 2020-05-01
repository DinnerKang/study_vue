<template>
    <div>
        <div
            class="group_container open_group_container"
            @click="clickGroup(groupData, openGroupData)"
            :style="{ width : `${width}px`, height: `${height}px`}"
        >
            <img :src="getImage" alt="썸네일" />
        </div>
        <div class="outside_area">
            <div class="main_text">
                <span>{{groupData.groupName}}</span>
                <div class="like-area">
                    <div v-if="likeUserNumber > 0">{{ likeUserNumber }}</div>
                    <img
                        class="img_area"
                        v-if="showLikes"
                        :src="isLike ? likeIcon : notIcon"
                        @click="clickLikeGroup(openGroupData)"
                        alt="하트"
                    />
                </div>
            </div>
            <div class="sub_text">{{groupData.description}}</div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from "@vue/composition-api";
import {
    getGroupListByKey,
    addLikeGroup,
    deleteLikeGroup
} from "@/services/group";
import { getImageByIdx } from "@/composible/thumbnails";

const getGroupData = (userInfo, openGroupData) => {
    const groupData = ref({});
    const getImage = ref(null);

    const data = {
        dealiName: openGroupData.dealiName,
        key: openGroupData.targetKey
    };
    getGroupListByKey(data).on("value", snapshot => {
        if (!snapshot.val()) return;
        groupData.value = snapshot.val();
        getImage.value = getImageByIdx(snapshot.val().thumbnailIdx);
    });

    return {
        groupData,
        getImage
    };
};

const clickEvent = (userInfo, router, isLike) => {
    const clickGroup = (groupData, openGroupData) => {
        router.push({
            path: "/playPage",
            query: {
                groupHost: openGroupData.dealiName,
                groupName: groupData.groupName,
                groupKey: groupData.targetKey || groupData.myKey
            }
        });
    };

    const clickLikeGroup = openGroupData => {
        if (!userInfo.value.dealiName) {
            alert("로그인 후 하트 눌러주세요 !");
            return;
        }
        const data = {
            dealiName: userInfo.value.dealiName,
            targetName: openGroupData.dealiName,
            targetKey: openGroupData.targetKey,
            isShowGroup: true
        };
        if (isLike.value === false) {
            addLikeGroup(data);
            isLike.value = true;
        } else {
            deleteLikeGroup(data);
            isLike.value = false;
        }
    };
    return {
        clickGroup,
        clickLikeGroup
    };
};

const iconList = () => {
    const likeIcon = require("@/assets/icons/Icon_heart_18x18(x2).png");
    const notIcon = require("@/assets/icons/Icon_heart_outline18x18(x2).png");

    return {
        likeIcon,
        notIcon
    };
};

export default {
    name: "OpenGroup",
    props: {
        openGroupData: {
            type: [String, Object]
        },
        width: {
            type: String,
            default: "240"
        },
        height: {
            type: String,
            default: "180"
        },
        showLikes: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { root }) {
        const userInfo = computed(
            () => root.$store.getters["login/getUserStatus"]
        );
        const isLike = ref(false);
        const likeUser = computed(() => props.openGroupData.likes);
        const likeUserNumber = computed(() => {
            if (props.openGroupData.likes) {
                return props.openGroupData.likes.count;
            }
            return 0;
        });

        watch(
            () => userInfo.value.dealiName,
            () => {
                if (!likeUser.value) return;
                if (
                    Object.keys(likeUser.value).includes(
                        userInfo.value.dealiName
                    )
                ) {
                    isLike.value = true;
                } else {
                    isLike.value = false;
                }
            }
        );

        return {
            ...getGroupData(userInfo, props.openGroupData),
            isLike,
            ...iconList(),
            ...clickEvent(userInfo, root.$router, isLike),
            likeUserNumber
        };
    }
};
</script>

<style lang="scss" scoped>
.group_container {
    box-sizing: border-box;
    color: $White;
    position: relative;
    cursor: pointer;
}
.outside_area {
    color: $Black;
    .main_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
        margin: 16px 0 8px;
        color: $White;

        .like-area {
            display: flex;
            align-items: center;

            .img_area {
                width: 19px;
                height: 19px;
                cursor: pointer;
                margin-left: 5px;
            }
        }
    }
    .sub_text {
        font-size: 12px;
        color: $Gray600;
    }
}
</style>