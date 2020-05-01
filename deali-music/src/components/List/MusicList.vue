<template>
    <article class="music_container">
        <div class="music_header">
            <div class="close_icon_area">
                <img :src="closeIcon" class="close_icon" @click="closeMenu" v-if="!showLike" />
            </div>
            <h2>{{ isLounge ? '라운지 ' : '' }}플레이리스트</h2>
            <img class="img_area" v-if="showLike" :src="isLike ? likeIcon : notIcon" 
                @click="clickLikeGroup" alt="하트" />
        </div>
        <ul class="music_container__list_area">
            <li
                class="music_container__list"
                v-for="(list, idx) in musicList"
                :key="list.videoId + idx"
                :class="{ active: nowMusic === list.musicName }"
            >
                <div class="list_idx">{{idx + 1}}</div>
                <div class="list_info">
                    <div class="list_music_register">{{list.register}}</div>
                    <div class="list_muisc_name" @click="clickMusic(idx)" :title="list.musicName">{{list.musicName}}</div>
                </div>
                <div class="list_duration">{{list.duration | setYoutubeTime}}</div>
                <img v-if="groupHost === userInfo.dealiName || groupHost === 'lounge'" :src="removeIcon" 
                class="delete_btn" @click="removeMusic(idx)" alt="삭제" />
            </li>
        </ul>
    </article>
</template>

<script>
import { musicControl } from "@/services/control";
import { getMusicListByGroup, deleteMusic } from "@/services/music";
import { addLikeGroup, deleteLikeGroup } from '@/services/group';
import { ref, watch, computed } from "@vue/composition-api";

const setMusicList = (props, emit, isLounge) => {
    const musicList = ref([]);

    const getMusicList = () => {
        const data = {
            dealiName: isLounge ? "lounge" : props.groupHost,
            groupKey: isLounge ? "lounge" : props.groupKey
        };

        getMusicListByGroup(data).on("value", snapshot => {
            if (!snapshot.val()) return;
            musicList.value = Object.values(snapshot.val()).reverse();
            emit("input", musicList.value);
        });
    };

    const removeMusic = idx => {
        if (!confirm("삭제하시겠습니까 ?")) return;
        const data = {
            dealiName: isLounge ? "lounge" : props.groupHost,
            groupKey: isLounge ? "lounge" : props.groupKey
        };
        getMusicListByGroup(data)
            .orderByKey()
            .once("value", snapshot => {
                if (!snapshot.val()) return;
                const key = Object.keys(snapshot.val()).reverse()[idx];
                deleteMusic(data, key);
            });
    };

    return {
        getMusicList,
        musicList,
        removeMusic
    };
};

const iconData = () => {
    const closeIcon = require('@/assets/icons/Icon_close_20x20(x2).png');
    const removeIcon = require("@/assets/icons/Icon_close_white_20x20(x2).png");
    const likeIcon = require("@/assets/icons/Icon_heart_18x18(x2).png");
    const notIcon = require("@/assets/icons/Icon_heart_outline18x18(x2).png");

    return {
        closeIcon,
        removeIcon,
        likeIcon,
        notIcon,
    };
};

export default {
    name: "MusicList",
    props: {
        value: {},
        groupHost: {
            type: String
        },
        groupName: {
            type: String
        },
        groupKey: {
            type: String
        },
        nowMusic: {
            type: String
        },
        showLike: {
            type: Boolean,
            default: false
        },
        isLike: {
            type: Boolean,
            default: false
        },
        showGroup: {
            type: Boolean,
        },
    },
    setup(props, { root, emit }) {
        const isLounge = props.groupName === "lounge";
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        
        const { getMusicList, musicList, removeMusic } = setMusicList(
            props,
            emit,
            isLounge,
        );

        const closeMenu = () => {
            emit("close-menu");
        };

        const clickMusic = idx => {
            if (isLounge) {
                musicControl(idx);
            } else {
                emit("click-music", idx);
            }
        };
        
         const clickLikeGroup = () => {
            if (!userInfo.value.dealiName) return;
            const data = {
                dealiName: userInfo.value.dealiName,
                targetName: props.groupHost,
                targetKey: props.groupKey,
                isShowGroup: props.showGroup,
            };

            if (props.isLike) {
                deleteLikeGroup(data);
            } else {
                addLikeGroup(data);
            }
        };


        watch(props.groupHost, () => {
            getMusicList();
        });

        return {
            musicList,
            removeMusic,
            getMusicList,
            closeMenu,
            clickMusic,
            isLounge,
            ...iconData(),
            clickLikeGroup,
            userInfo,
        };
    }
};
</script>

<style lang="scss" scoped>
.music_container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: $Black;
    color: $White;
    border: 2px solid $Main;

    .music_header {
        position: relative;
        width: 100%;
        height: 45px;
        border-bottom: 1px solid $Main;
        display: flex;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;

        .close_icon_area {
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;

            .close_icon {
                width: 15px;
                height: 15px;
                cursor: pointer;
                margin: 0 auto;
            }
        }
        h2 {
            margin: 0;
            font-size: 15px;
            font-weight: bold;
            color: $Main;
        }
        .img_area {
            width: 15px;
            cursor: pointer;
            position: absolute;
            right: 50px;
        }
    }
    .music_container__list_area {
        overflow-y: auto;
        height: calc(100% - 65px);

        .music_container__list {
            width: 100%;
            height: 70px;
            padding: 20px 15px 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            &.active {
                background-color: $Main
            }

            .list_idx {
                width: 40px;
                text-align: center;
            }

            .list_info {
                width: 250px;
                position: relative;

                .list_music_register {
                    font-size: 11px;
                    color: $White;
                    position: absolute;
                    top: -15px;
                }

                .list_muisc_name {
                    width: 100%;
                    font-size: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }
            }
            .list_duration {
                font-size: 12px;
            }
            .delete_btn {
                width: 7px;
                border: none;
                cursor: pointer;
                margin-left: 20px;
            }
        }
    }
}
</style>
