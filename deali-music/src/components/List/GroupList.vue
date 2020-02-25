<template>
    <div >
        <div class="group_container"
            @click="clickGroup"
            :style="{ width : `${width}px`, height: `${height}px`}">
            
            <div class="bottom_area" v-if="!isOutside">
                <div class="main_text">{{list.groupName}}</div>
                <div class="sub_text">{{list.description}}</div>
            </div>
        </div>
        <div class="outside_area" v-if="isOutside">
            <div class="main_text">
                <span>{{list.groupName}}</span>
                <span class="img_area" @click="clickLikeGroup(list)">하트</span>
            </div>
            <div class="sub_text">{{list.description}}</div>
        </div>
    </div>
    
</template>

<script>
import { addLikeGroup } from '@/service/Group';

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
            default: '480',
        },
        height: {
            type: String,
            default: '360',
        },
        isOutside: {
            type:Boolean,
            default: false,
        }
    },
    setup(props, { root }) {
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
                dealiName: root.$store.state.login.dealiName,
                targetId: list.name,
                groupName: list.groupName,
            }
            addLikeGroup(data);
        }

        return {
            clickGroup,
            clickLikeGroup,
        }
    }
}
</script>

<style lang="scss" scoped>
    .group_container{
        border:1px solid #000;
        border-radius: 8px;
        background-color: #000;
        color: $White;
        position: relative;
        cursor: pointer;

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
                display: block;
                font-size: 15px;
                font-weight: bold;
                margin: 16px 0 8px;

                .img_area{
                    float:right;
                }
            }
            .sub_text{
                font-size: 12px;
                color: $Gray600;
            }
        }
</style>