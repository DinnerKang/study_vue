<template>
    <div >
        <div class="group_container"
            @click="clickGroup(groupData)"
            :style="{ width : `${width}px`, height: `${height}px`}">
            <img v-if="musicData.thumbnails" class="youtube_img" :src="musicData.thumbnails" alt="유튜브 사진" />
            <div class="bottom_area">
                <div class="main_text">{{groupData.groupName}}</div>
                <div class="sub_text">{{groupData.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api';
import { getGroupListByKey } from '@/service/Group';
import { getMusicListByGroup } from '@/service/Music';

const iconList = () => {
    const liketIcon = require('../../assets/icons/Heart-01.png');
    const heartIcon = require('../../assets/icons/Heart-02.png');

    return {
        heartIcon,
        liketIcon,
    }
};

const getMusicData = (userInfo, groupKey) => {
    const musicData = ref({});
    const data = {
        dealiName: userInfo.value.dealiName,
        groupKey: groupKey,
        groupName: '',
    }

    getMusicListByGroup(data).once('value', snapshot => {
        musicData.value = Object.values(Object.values(snapshot.val())[0])[0];
    });

    return {
        musicData,
    }
};

const getGroupData = (userInfo, groupKey) => {
    const groupData = ref({});

    const data = {
        dealiName: userInfo.value.dealiName,
        key: groupKey,
    }
    getGroupListByKey(data).once('value', snapshot =>{
        groupData.value = snapshot.val();
    });

    return {
        groupData,
    }
};

const clickEvent = (userInfo, router) => {

    const clickGroup = (groupData) => {
        router.push({
            path: `/playPage`,
            query: {
                groupName: groupData.groupName,
                groupKey: groupData.myKey,
            },
        });
    }

    const clickLikeGroup = (list) => {
        const data = {
            dealiName: userInfo.dealiName,
            myKey: list.myKey,
            groupName: list.groupName,
        }
        addLikeGroup(data);
    }
    return {
        clickGroup,
        clickLikeGroup,
    }
}

export default {
    name: 'GroupList',
    props: {
        groupKey: {
            type: String,
        },
        width: {
            type: String,
            default: '500',
        },
        height: {
            type: String,
            default: '375',
        },
    },
    setup(props, { root }) {
        const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);

        const { musicData } = getMusicData(userInfo, props.groupKey);
        const { groupData } = getGroupData(userInfo, props.groupKey);
        const { clickGroup } = clickEvent(userInfo, root.$router);

        return {
            musicData,
            groupData,
            clickGroup,
            ...iconList(),
        }
    }
}
</script>

<style lang="scss" scoped>
    .group_container{
        border: none;
        border-radius: 8px;
        color: $White;
        position: relative;
        cursor: pointer;

        .youtube_img{
            width: 100%;
        }

        .bottom_area{
            position: absolute;
            bottom: 24px;
            left: 24px;
            right: 24px;
            color: $White;

            .main_text{
                font-size: 15px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            .sub_text{
                font-size: 12px;
                height: 16px;
            }
        }
    }
</style>