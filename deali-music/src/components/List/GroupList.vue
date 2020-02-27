<template>
    <div >
        <div class="group_container"
            @click="clickGroup"
            :style="{ width : `${width}px`, height: `${height}px`}">
            <img v-if="groupThumbnail" class="youtube_img" :src="groupThumbnail" alt="유튜브 사진" />
            <div class="bottom_area" v-if="!isOutside">
                <div class="main_text">{{list.groupName}}</div>
                <div class="sub_text">{{list.description}}</div>
            </div>
        </div>
        <div class="outside_area" v-if="isOutside">
            <div class="main_text">
                <span>{{list.groupName}}</span>
                <img class="img_area" :src="heartIcon" @click="clickLikeGroup(list)" alt="하트" />
            </div>
            <div class="sub_text">{{list.description}}</div>
        </div>
    </div>
    
</template>

<script>
import { computed, ref } from '@vue/composition-api';
import { addLikeGroup, getGroupListByKey } from '@/service/Group';

const iconList = () => {
    const liketIcon = require('../../assets/icons/Heart-01.png');
    const heartIcon = require('../../assets/icons/Heart-02.png');

    return {
        heartIcon,
        liketIcon,
    }
};

const getGroupData = (userInfo, list) => {
    const groupData = ref({});
    const key = Object.keys(list)[0];

    const data = {
        dealiName: userInfo.value.dealiName,
        key: key,
    }

    getGroupListByKey(data).once('value', ()=>{
        // console.log(snapshot.val());
    });
    return {
        groupData,
    }
};

const getThumbnails = (list) => {
    const groupThumbnail = ref('');
    groupThumbnail.value = Object.values(list)[0].thumbnails;
    return {
        groupThumbnail,
    }
};

export default {
    name: 'GroupList',
    props: {
        list: {
            type: [Object, String],
            default: () => {
                return {
                    groupName : '',
                    description: '',
                }
            }
        },
        width: {
            type: String,
            default: '500',
        },
        height: {
            type: String,
            default: '375',
        },
        isOutside: {
            type:Boolean,
            default: false,
        }
    },
    setup(props, { root }) {
        const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
        const list = Object.values(props.list)[0];

        const clickGroup = () => {
            if (!props.list.groupName) return;

            root.$router.push({
                path: '/playPage',
                query: {
                    groupName: props.list.groupName
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

        const { groupThumbnail } = getThumbnails(list);
        const { groupData } = getGroupData(userInfo, list);

        return {
            clickGroup,
            clickLikeGroup,
            groupThumbnail,
            groupData,
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
            }
        }
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