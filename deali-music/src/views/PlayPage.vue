<template>
    <section class="play_page">
        <div class="left_area">
            <article class="plyaer_container">
                <div id="player"></div>
            </article>
            <div class="list_area">
                <music-list
                    v-model="myMusicList"
                    :group-host="groupHost"
                    :group-name="groupName"
                    :groupKey="groupKey"
                    :is-like="isLike"
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
        </div>
    </section>
</template>

<script>
import { ref, watch , computed } from "@vue/composition-api";
import MusicList from "@/components/list/MusicList";
import OpenGroupList from "@/components/list/OpenGroupList";
import { openGroup } from "@/composible/openGroup";
import { getLikeGroupByKey } from '@/services/Group';

const youtubeData = () => {
    let player = {};
    const myMusicList = ref([]);

    const onYouTubeIframeAPIReady = () => {
        player = new YT.Player("player", {
            playerVars: { origin: "https://vue-pwa-776e7.firebaseapp.com" },
            width: "600",
            events: {
                onReady: addPlayList
            }
        });
    };

    const addPlayList = () => {
        const playList = myMusicList.value.map(item => item.videoId);
        player.cuePlaylist({
            playlist: playList
        });
    };

    const changeMusic = idx => {
        player.playVideoAt(idx);
    };

    return {
        player,
        myMusicList,
        onYouTubeIframeAPIReady,
        changeMusic
    };
};

const getLike = (key, userInfo) => {
    const isLike = ref(false);
    getLikeGroupByKey(key).on('value', snapshot => {
        const result = snapshot.val();
        if (result){
            isLike.value = result[userInfo.value.dealiName];
        } else {
            isLike.value = false;
        }
    });

    return {
        isLike,
    };
};

export default {
    name: "PlayPage",
    components: { MusicList, OpenGroupList },
    setup(props, { root }) {
        const { groupKey, groupName, groupHost } = root.$route.query;
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);

        const {
            player,
            myMusicList,
            onYouTubeIframeAPIReady,
            changeMusic
        } = youtubeData();
        const isList = ref(true);
        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) {
                return (isList.value = false);
            } else {
                isList.value = true;
            }
            onYouTubeIframeAPIReady();
        });

        return {
            groupName,
            groupKey,
            groupHost,
            myMusicList,
            player,
            onYouTubeIframeAPIReady,
            isList,
            changeMusic,
            ...openGroup(),
            ...getLike(groupKey, userInfo),
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
            border-radius: 8px;
            overflow: hidden;
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
            }
            .recomend_group_list {
                width: 240px;
                margin-bottom: 30px;
            }
        }
        
    }
}

</style>
