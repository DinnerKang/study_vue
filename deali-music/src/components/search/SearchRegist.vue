<template>
    <section class="regist_container">
        <article class="music_list_container">
            <ul class="list_area">
                <li class="item_lists" v-for="(item, idx) in searchResult.items" :key="idx">
                    <img
                        v-if="item.snippet.thumbnails"
                        :src="item.snippet.thumbnails.medium.url"
                        class="thumbnails"
                        alt="유튜브 썸네일"
                    />
                    <div class="text_area">
                        <div class="main_text_area">
                            <h3 class="main_text">{{item.snippet.title | decodeStr}}</h3>
                            <div class="menu_area" v-if="userInfo.dealiName">
                                <ul class="menu_list_area">
                                    <li class="menu_list" @click="clickRegist(item, 'lounge')">라운지</li>
                                    <li v-for="list in groupList" :key="list.myKey"
                                        class="menu_list"
                                        @click="clickRegist(item, list.myKey)">
                                        {{ list.groupName }}
                                    </li>
                                </ul>
                                <img class="menu_icon" :src="menuIcon" @click="showMenu" alt="메뉴" />
                            </div>
                        </div>
                        <h5 class="sub_text">{{item.snippet.publishedAt | timeForToday}}</h5>
                            
                    </div>
                </li>
            </ul>
        </article>
    </section>
</template>

<script>
import { registMusic } from "@/services/Music";
import { getGroupList } from "@/services/Group";
import { computed, ref } from "@vue/composition-api";
import { decodeStr } from "@/composible/decodeStr";
import menuIcon from '@/assets/icons/button-of-three-vertical-squares.png';
import ClickOutside from "vue-click-outside";

const clickEvent = (userInfo) => {
    
    const clickRegist = (item, key) => {
        const register = userInfo.value.userName;
        console.log(item);

        const searchResult = {
            thumbnails: item.snippet.thumbnails.high.url,
            musicName: decodeStr(item.snippet.title),
            videoId: item.id.videoId,
            registDate: String(new Date()),
            register: register,
            dealiName: key === 'lounge' ? 'lounge' : userInfo.value.dealiName,
            groupKey: key,
        };
        registMusic(searchResult);
    };

    return {
        clickRegist,
    };
};

const groupData = (userInfo) => {
    const groupList = ref([]);
    const isMenu = ref(false);

    getGroupList(userInfo.value.dealiName).on("value", snapshot => {
        groupList.value = Object.values(snapshot.val());
    });

    const showMenu = () => {
        isMenu.value = true;
    };

    return {
        groupList,
        showMenu,
        isMenu,
    };
};

export default {
    name: "MusicRegist",
    props: {
        searchResult: {
            type: [Object, String]
        }
    },
    directives: {
        ClickOutside
    },
    setup(props, { root }) {
        const userInfo = computed(() => root.$store.getters["login/getUserStatus"]);

        return {
            ...clickEvent(userInfo),
            ...groupData(userInfo),
            menuIcon,
            userInfo,
        };
    }
};
</script>

<style lang="scss" scoped>
.music_list_container {
    margin-top: 56px;

    .list_area {
        width: 100%;
        display: grid;
        grid-template-rows: repeat(3, 300px);
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        .item_lists {
            width: 320px;

            .thumbnails {
                width: 320px;
                height: 180px;
            }
            .text_area {
                width: 320px;

                .main_text_area{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-top: 10px;

                    .main_text {
                        font-size: 15px;
                        overflow: hidden;
                        line-height: 1.2em;
                        height: 2.5em;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin: 0;
                    }
                    .menu_area{
                        position: relative;

                        .menu_icon{
                            width: 20px;
                            cursor: pointer;
                        }
                        .menu_list_area{
                            position: absolute;
                            overflow: auto;
                            width: 240px;
                            height: 200px;
                            bottom: 30px;
                            z-index: 3;
                            background-color: $White;
                            border: 1px solid $Gray400;

                            .menu_list{
                                height: 36px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100%;
                            }
                        }
                    }
                    
                }
                .sub_text {
                }
            }
        }
    }
}
</style>