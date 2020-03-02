<template>
    <div>
        <div class="group_container"
            @click="clickGroup(openGroupData)"
            :style="{ width : `${width}px`, height: `${height}px`}">
            <img v-if="groupData.thumbnail" :src="groupData.thumbnail" style="width:100%; height:100%" alt="썸네일"/>
        </div>
        <div class="outside_area">
            <div class="main_text">
                <span>{{groupData.groupName}}</span>
                <img class="img_area" :src="isLike ? likeIcon : notIcon" @click="clickLikeGroup(openGroupData, isLike)" alt="하트" />
            </div>
            <div class="sub_text">{{groupData.description}}</div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api';
import { getGroupListByKey, addLikeGroup, deleteLikeGroup } from '@/service/Group';

const getGroupData = (userInfo, openGroupData) => {
    const groupData = ref({});

    const data = {
        dealiName: openGroupData.dealiName,
        key: openGroupData.targetKey,
    }
    getGroupListByKey(data).on('value', snapshot =>{
        groupData.value = snapshot.val();
    });

    return {
        groupData,
    }
};

const clickEvent = (userInfo, router) => {
    const clickGroup = (openGroupData) => {
        router.push({
            path: `/playPage`,
            query: {
                groupName: openGroupData.groupName,
                groupKey: openGroupData.targetKey,
            },
        });
    }

    const clickLikeGroup = (openGroupData, isLike) => {
        const data = {
            dealiName: userInfo.value.dealiName,
            myKey: openGroupData.myKey,
        };
        if (isLike === false) {
            addLikeGroup(data);
        } else {
            deleteLikeGroup(data);
        }
    }
    return {
        clickGroup,
        clickLikeGroup,
    }
}

const iconList = () => {
    const isLike = ref(false);
    const likeIcon = require('../../assets/icons/Heart-01.png');
    const notIcon = require('../../assets/icons/Heart-02.png');

    return {
        isLike,
        likeIcon,
        notIcon,
    }
};

export default {
    name: 'OpenGroup',
    props: {
        openGroupData: {
            type: [String, Object],
        },
        width: {
            type: String,
            default: '238',
        },
        height: {
            type: String,
            default: '180',
        },
    },
    setup(props, { root }) {
        const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
        
        const { groupData } = getGroupData(userInfo, props.openGroupData);
        const { clickGroup, clickLikeGroup } = clickEvent(userInfo, root.$router);
        const { isLike, notIcon, likeIcon } = iconList();
        const likeUser = computed(() =>  props.openGroupData.likes);

        watch(() => {
            if (!likeUser.value || !userInfo.value.dealiName) return isLike.value = false;
            if (Object.keys(likeUser.value).includes(userInfo.value.dealiName)) {
                isLike.value = true;
            } else {
                isLike.value = false;
            }
        });

        return {
            groupData,
            isLike,
            notIcon,
            likeIcon,
            clickGroup,
            clickLikeGroup,
            likeUser,
        }
    }
}
</script>

<style lang="scss" scoped>
    .group_container{
        border: 1px solid $Black;
        box-sizing: border-box;
        border-radius: 8px;
        color: $White;
        position: relative;
        cursor: pointer;
    }
    .outside_area{
        color: $Black;
        .main_text{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 15px;
            font-weight: bold;
            margin: 16px 0 8px;
            .img_area{
                width: 19px;
                height: 19px;
                cursor: pointer;
            }
        }
        .sub_text{
            font-size: 12px;
            color: $Gray600;
        }
    }
</style>