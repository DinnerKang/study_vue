<template>
    <section class="play_page">
        <div class="left_area">
            <article class="plyaer_container">
                <div id="player"></div>
                <div v-if="!isList">저장된 노래가 없습니다.</div>
            </article>
            <div class="list_area">
                <music-list
                    v-model="myMusicList"
                    :group-host="groupHost"
                    :group-name="groupName"
                    :group-key="groupKey"
                    :is-like="isLike"
                    :show-group="isShowGroup"
                    :show-like="true"
                    @click-music="changeMusic"
                />
            </div>
        </div>
        <div class="right_area">
            <article class="recomend_play_list">
                <h2 class="list_text">공개 플레이리스트</h2>
                <div class="recomend_group">
                    <div v-for="(list, idx) in openGroups" :key="idx" class="recomend_group_list">
                        <open-group-list :openGroupData="list"></open-group-list>
                    </div>
                </div>
            </article>
            <button class="read-more" type="button" @click="readMore" v-if="!isFinish">
                <img class="read-more__icon" :src="readMoreIcon" alt="더보기"/>더보기
            </button>
        </div>
    </section>
</template>

<script>
import { ref, watch , computed } from "@vue/composition-api";
import MusicList from "@/components/list/MusicList";
import OpenGroupList from "@/components/list/OpenGroupList";
import readMoreIcon from '@/assets/icons/Icon_detail_16x16(x3).png';
import { openGroup } from "@/composible/openGroup";
import { getLikeGroupList, getGroupListByKey } from '@/services/group';

const youtubeData = () => {
    const player = ref({});
    const myMusicList = ref([]);
    const isReady = ref(false);

    const onYouTubeIframeAPIReady = () => {
        player.value = new YT.Player("player", {
            playerVars: { origin: "https://vue-pwa-776e7.firebaseapp.com" },
            width: "600",
            events: {
                onReady: addPlayList
            }
        });
    };

    const addPlayList = () => {
        const playList = myMusicList.value.map(item => item.videoId);
        player.value.cuePlaylist({
            playlist: playList
        });
        isReady.value = true;

        setTimeout(() => {
            player.value.playVideo();
        }, 1000);
    };

    const changeMusic = (idx) => {
        player.value.playVideoAt(idx);
    };

    return {
        myMusicList,
        onYouTubeIframeAPIReady,
        changeMusic,
        addPlayList,
        isReady,
    };
};

const getLike = (key, groupHost, userInfo) => {
    const isLike = ref(false);
    const isShowGroup = ref(false);
    const myData = {
        dealiName: userInfo.value.dealiName,
        key,
    };
    const hostData = {
        dealiName: groupHost,
        key,
    };


    getLikeGroupList(myData).on('value', snapshot => {
        const result = snapshot.val();
        if (Object.keys(result).includes(key)){
            isLike.value = true;
        } else {
            isLike.value = false;
        }
    });
    
    getGroupListByKey(hostData).once('value', (snapshot) => {
        if (!snapshot.val()) return isShowGroup.value = false;
        isShowGroup.value = snapshot.val().isShowGroup;
    });

    return {
        isLike,
        isShowGroup,
    };
};

export default {
    name: "PlayPage",
    components: { MusicList, OpenGroupList },
    setup(props, { root }) {
        const perPage = 4;
        const page = ref(1);
        const isList = ref(true);
        const { groupKey, groupName, groupHost } = root.$route.query;
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);

        const {
            myMusicList,
            onYouTubeIframeAPIReady,
            changeMusic,
            addPlayList,
            isReady,
        } = youtubeData();

        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) {
                return isList.value = false;
            } else {
                isList.value = true;
            }

            if (isReady.value === true) {
                addPlayList();
            } else {
                onYouTubeIframeAPIReady();
            }
        });

        return {
            groupName,
            groupKey,
            groupHost,
            myMusicList,
            onYouTubeIframeAPIReady,
            isList,
            changeMusic,
            ...openGroup(perPage, page, false),
            ...getLike(groupKey, groupHost, userInfo),
            readMoreIcon,
        };
    }
};
</script>

<style lang="scss" scoped>
.play_page {
    margin-top: 64px;
    display: flex;
    justify-content: space-between;

    .left_area{
        width: 600px;

        .plyaer_container{
            width: 600px;
            height: 360px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $White;
        }
        .list_area {
            margin-top: 30px;
            width: 100%;
            height: 360px;
        }
        
    }
    .right_area{
        width: 300px;

        .recomend_play_list{
            .list_text{
                margin: 0 0 30px;
                color: $White;
            }
            .recomend_group_list {
                width: 240px;
                margin-bottom: 30px;
            }
        }
        .read-more{
            width: 240px;
            height: 30px;
            font-size: 15px;
            border: 1px solid $White;
            background-color: $Black;
            color: $Main;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 100px;
            cursor: pointer;
            
            &__icon{
                margin-right: 12px;
                width: 16px;
            }
        }
    }
}

</style>
