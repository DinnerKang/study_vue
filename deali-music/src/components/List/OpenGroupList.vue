<template>
    <div>
        <div class="group_container open_group_container"
            @click="clickGroup(groupData)"
            :style="{ width : `${width}px`, height: `${height}px`}">
            <img :src="getImage" alt="썸네일"/>
        </div>
        <div class="outside_area">
            <div class="main_text">
                <span>{{groupData.groupName}}</span>
                <img class="img_area" v-if="isLikes" :src="isLike ? likeIcon : notIcon" @click="clickLikeGroup(openGroupData)" alt="하트" />
            </div>
            <div class="sub_text">{{groupData.description}}</div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api';
import { getGroupListByKey, addLikeGroup, deleteLikeGroup } from '@/service/Group';

const getGroupData = (userInfo, openGroupData, store) => {
    const groupData = ref({});
    let getImage = ref('');
    

    const data = {
        dealiName: openGroupData.dealiName,
        key: openGroupData.targetKey,
    };
    getGroupListByKey(data).on('value', async snapshot =>{
        groupData.value = snapshot.val();
        const img = computed(()=> store.getters['image/getImages'](snapshot.val().thumbnailIdx));
        /*
        store.watch((state) => state.image[snapshot.val().thumbnailIdx], () => {
            console.log('hi');
        });*/
        getImage.value = img.value;
    });


    return {
        groupData,
        getImage,
    }
};

const clickEvent = (userInfo, router, isLike) => {

    const clickGroup = (groupData) => {
        router.push({
            path: `/playPage`,
            query: {
                groupName: groupData.groupName,
                groupKey: groupData.targetKey || groupData.myKey,
            },
        });
    }

    const clickLikeGroup = (openGroupData) => {
        if (!userInfo.value.dealiName) return;
        const data = {
            dealiName: userInfo.value.dealiName,
            targetName: openGroupData.dealiName,
            targetKey: openGroupData.targetKey,
        };
        if (isLike.value === false) {
            addLikeGroup(data);
            isLike.value = true;
        } else {
            deleteLikeGroup(data);
            isLike.value = false;
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
        isLikes: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, { root }) {
        const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
        
        const { groupData, getImage } = getGroupData(userInfo, props.openGroupData, root.$store);
        const { isLike, notIcon, likeIcon } = iconList();
        const { clickGroup, clickLikeGroup } = clickEvent(userInfo, root.$router, isLike);

        const likeUser = computed(() => props.openGroupData.likes);


        watch(() => userInfo.value.dealiName, () => {
            if (!likeUser.value || !userInfo.value.dealiName) return isLike.value = false;
            if (userInfo.value.dealiName !== '') {
                if (Object.keys(likeUser.value).includes(userInfo.value.dealiName)) {
                    isLike.value = true;
                } else {
                    isLike.value = false;
                }
            }
        });
        
        return {
            groupData,
            getImage,
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