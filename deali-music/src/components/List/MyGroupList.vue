<template>
    <div >
        <div class="group_container"
            @click="clickGroup(groupData)"
            :style="{ width : `${width}px`, height: `${height}px`}">
            <img v-if="groupThumbnail" class="youtube_img" :src="groupData.thumbnail" alt="그룹 썸네일" />
            <img v-else class="youtube_img" :src="musicData.thumbnails" alt="유튜브 사진" />
            <div class="bottom_area" :style="{padding: bottomPadding, height: bottomPadding ? '30%' : '20%'}">
                <div class="main_text">{{groupData.groupName}}</div>
                <div class="sub_text">{{groupData.description }}</div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { getGroupListByKey } from '@/service/Group';
import { getMusicListByGroup } from '@/service/Music';



const getMusicData = (targetName, groupKey) => {
    const musicData = ref({});
    const data = {
        dealiName: targetName,
        groupKey: groupKey,
        groupName: '',
    }

    getMusicListByGroup(data).once('value', snapshot => {
        if(!snapshot.val()) return;
        musicData.value = Object.values(Object.values(snapshot.val())[0])[0];
    });

    return {
        musicData,
    }
};

const getGroupData = (targetName, groupKey) => {
    const groupData = ref({});

    const data = {
        dealiName: targetName,
        key: groupKey,
    };
    getGroupListByKey(data).once('value', snapshot =>{
        if (!snapshot.val()) return;
        groupData.value = snapshot.val();
    });

    return {
        groupData,
    }
};

const clickEvent = (router) => {

    const clickGroup = (groupData) => {
        router.push({
            path: `/playPage`,
            query: {
                groupName: groupData.groupName,
                groupKey: groupData.myKey,
            },
        });
    }

    return {
        clickGroup,
    }
}

export default {
    name: 'GroupList',
    props: {
        groupKey: {
            type: String,
        },
        targetName: {
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
        groupThumbnail: {
            type: Boolean,
            default: false,
        },
        bottomPadding: {
            type: String,
        }
    },
    setup(props, { root }) {
        const { musicData } = getMusicData(props.targetName, props.groupKey);
        const { groupData } = getGroupData(props.targetName, props.groupKey);
        const { clickGroup } = clickEvent(root.$router);

        return {
            musicData,
            groupData,
            clickGroup,
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
            height: 100%;
        }

        .bottom_area{
            position: absolute;
            height: 20%;
            width: 100%;
            bottom: 0px;
            color: $White;
            padding: 24px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.6);

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