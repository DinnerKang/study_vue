<template>
    <section class="regist_container">
        <article class="music_list_container">
            <ul class="list_area" >
                <li class="item_lists" v-for="(item, idx) in searchResult.items" :key="idx" >
                    <img
                        v-if="item.snippet.thumbnails"
                        :src="item.snippet.thumbnails.medium.url"
                        class="thumbnails"
                        :class="{ isLogin: userInfo.dealiName}"
                        alt="유튜브 썸네일"
                        @click="controlMenu(idx)"
                    />
                    <div class="text_area" >
                        <div class="main_text_area">
                            <h3 class="main_text">{{item.snippet.title | decodeStr}}</h3>
                            <div class="menu_area" v-if="userInfo.dealiName" >
                                <ul class="menu_list_area">
                                    <regist-list v-if="isMenu===idx" :item="item" :group-list="groupList" 
                                    @click-regist="clickRegist" @close-menu="closeMenu" />
                                </ul>
                                <img class="menu_icon"
                                :src="menuIcon"
                                @click="controlMenu(idx)" alt="메뉴"/>
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
import { registMusic } from "@/services/music";
import { getGroupList } from "@/services/group";
import { computed, ref } from "@vue/composition-api";
import { decodeStr } from "@/composible/decodeStr";
import menuIcon from '@/assets/icons/Icon_dot_menu_20x20(x2).png';
import RegistList from '@/components/list/RegistList';

const clickEvent = (userInfo) => {
    const isMenu = ref('');
    
    const clickRegist = (item, key) => {
        const register = userInfo.value.userName;

        const searchResult = {
            thumbnails: item.snippet.thumbnails.high.url,
            musicName: decodeStr(item.snippet.title),
            videoId: item.id.videoId,
            registDate: String(new Date()),
            register: register,
            dealiName: key === 'lounge' ? 'lounge' : userInfo.value.dealiName,
            groupKey: key,
        };
        isMenu.value = '';
        registMusic(searchResult);
    };

    const controlMenu = (idx) => {
        if (isMenu.value === idx) return isMenu.value = '';
        isMenu.value = idx;
    };

    const closeMenu = () => {
        isMenu.value = '';
    };

    return {
        clickRegist,
        isMenu,
        controlMenu,
        closeMenu,
    };
};


const groupData = (userInfo) => {
    const groupList = ref([]);

    getGroupList(userInfo.value.dealiName).on("value", snapshot => {
        groupList.value = Object.values(snapshot.val());
    });

    return {
        groupList,
    };
};

export default {
    name: "MusicRegist",
    components: {
        RegistList,
    },
    props: {
        searchResult: {
            type: [Object, String]
        }
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
    margin-bottom: 120px;
    color: $White;

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
            .isLogin{
                cursor: pointer;
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
                            width: 14px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>