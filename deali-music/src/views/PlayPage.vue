<template>
    <section class="play_page">
        <div id="player"></div>
        <div class="list_area">
            <music-list
                v-model="myMusicList"
                :group-name="groupName"
                :groupKey="groupKey"
                :is-list="true"
                @click-music="changeMusic"
            />
        </div>
        <section class="recomend_play_list">
            <h2>공개 플레이리스트</h2>
            <div class="recomend_group">
                <article v-for="(list, idx) in openGroups" :key="idx" class="recomend_group_list">
                    <open-group-list :openGroupData="list"></open-group-list>
                </article>
            </div>
        </section>
        <div class="empty_area" v-if="!isList">노래를 추가해주세요.</div>
    </section>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import MusicList from "@/components/list/MusicList";
import OpenGroupList from "@/components/list/OpenGroupList";
import { openGroup } from "@/composible/openGroup";

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

export default {
    name: "PlayPage",
    components: { MusicList, OpenGroupList },
    setup(props, { root }) {
        const { groupKey } = root.$route.query;
        const { groupName } = root.$route.query;
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
            myMusicList,
            player,
            onYouTubeIframeAPIReady,
            isList,
            changeMusic,
            ...openGroup()
        };
    }
};
</script>

<style lang="scss" scoped>
.play_page {
    margin-top: 64px;

    #player {
        float: left;
    }
    .list_area {
        float: right;
        width: 400px;
        height: 360px;
    }
    .recomend_play_list {
        margin-top: 64px;

        .recomend_group {
            display: grid;
            gap: 10px 20px;
            grid-template-rows: 250px;
            grid-template-columns: repeat(4, 1fr);
            margin-bottom: 300px;

            .recomend_group {
                display: flex;
                justify-content: center;
            }
        }
    }
}

.empty_area {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
