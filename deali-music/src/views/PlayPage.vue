<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" :group-name="groupName" :groupKey="groupKey" :is-list="true"
        @click-music="changeMusic" />
        <div class="empty_area" v-if="!isList" >
            노래를 추가해주세요.
        </div>
    </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import MusicList from '@/components/list/MusicList';

const youtubeData = () => {
    let player = {};
    const myMusicList = ref([]);

    const onYouTubeIframeAPIReady = () => {
        player = new YT.Player("player", {
            playerVars: { origin: "https://vue-pwa-776e7.firebaseapp.com" },
            height: "360",
            width: "640",
            events: {
                onReady: addPlayList,
            }
        });
    };

    const addPlayList = () => {
        const playList = myMusicList.value.map(item => item.videoId);
        player.cuePlaylist({
            playlist: playList,
        });
    };

    const changeMusic = (idx) => {
        player.playVideoAt(idx);
    };

    return {
        player,
        myMusicList,
        onYouTubeIframeAPIReady,
        changeMusic,
    }
}

export default {
    name: 'PlayPage',
    components: {MusicList},
    setup(props, { root }){
        const { groupKey } = root.$route.query;
        const { groupName } = root.$route.query;
        const { player, myMusicList, onYouTubeIframeAPIReady, changeMusic } = youtubeData();
        const isList = ref(true);
        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) {
                return isList.value = false;
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
        }
    },
}

</script>

<style lang="scss" scoped>
    .empty_area{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
