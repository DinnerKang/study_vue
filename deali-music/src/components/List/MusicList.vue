<template>
    <article class="music_container">
        <div class="music_header">
            <div class="close_icon_area">
                <div class="close_icon" @click="closeMenu" v-show="!showLike" />
                <img class="img_area" v-if="showLike" :src="isLike ? likeIcon : notIcon" 
                    @click="clickLikeGroup" alt="하트" />
            </div>
            <h2>{{ isLounge ? '라운지 ' : '' }}플레이리스트</h2>
        </div>
        <ul class="music_container__list_area">
            <li
                class="music_container__list"
                v-for="(list, idx) in musicList"
                :key="idx"
                :class="{ active: nowMusic === list.musicName }"
            >
                <div class="list_idx">{{idx + 1}}</div>
                <div class="list_info">
                    <div class="list_music_register">{{list.register}}</div>
                    <div class="list_muisc_name" @click="clickMusic(idx)">{{list.musicName}}</div>
                </div>
                <div class="list_duration">{{list.duration | setYoutubeTime}}</div>
                <img :src="removeIcon" class="delete_btn" @click="removeMusic(idx)" alt="삭제" />
            </li>
        </ul>
    </article>
</template>

<script>
import { musicControl } from "@/services/Control";
import { getMusicListByGroup, deleteMusic } from "@/services/Music";
import { addLikeGroup, deleteLikeGroup } from '@/services/Group';
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
    const removeIcon = require("@/assets/icons/icon_xbutton_x2(14x14).png");
    const likeIcon = require("../../assets/icons/icon_heart_x3(57x57).png");
    const notIcon = require("../../assets/icons/icon_heartoutline_x3(58x58).png");

    return {
        removeIcon,
        likeIcon,
        notIcon
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
        }
    },
    setup(props, { root, emit }) {
        const isLounge = props.groupName === "lounge";
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        
        const { getMusicList, musicList, removeMusic } = setMusicList(
            props,
            emit,
            isLounge
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
                targetName: userInfo.value.dealiName,
                targetKey: props.groupKey,
            };
            if (props.isLike === false) {
                addLikeGroup(data);
            } else {
                deleteLikeGroup(data);
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
        };
    }
};
</script>

<style lang="scss" scoped>
.music_container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: $White;
    color: $Black;
    border-radius: 8px;
    box-shadow: 3px 0px 50px rgba(0, 0, 0, 0.1);

    .music_header {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid $Gray400;
        display: flex;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;

        .close_icon_area {
            width: 40px;
            text-align: center;

            .close_icon {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #fa8282;
                cursor: pointer;
                margin: 0 auto;
            }
            .img_area {
                width: 15px;
                cursor: pointer;
            }
        }
        h2 {
            margin: 0;
            font-size: 15px;
            font-weight: bold;
        }
    }
    .music_container__list_area {
        padding-top: 20px;
        overflow-y: auto;
        height: calc(100% - 65px);

        .music_container__list {
            width: 100%;
            height: 30px;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            &.active {
                background-color: rgba(0, 0, 0, 0.1);
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
                    color: $Gray400;
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
                border: none;
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }
}
</style>
