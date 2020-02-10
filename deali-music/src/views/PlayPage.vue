<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" :group-name="groupName" :is-list="true" />
    </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import MusicList from '../components/MyPage/MusicList';

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

    return {
        player,
        myMusicList,
        onYouTubeIframeAPIReady,
    }
}

export default {
    name: 'PlayPage',
    components: {MusicList},
    setup(props, { root }){
        const { groupName } = root.$route.query;
        const { player, myMusicList, onYouTubeIframeAPIReady } = youtubeData();

        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) return;
            onYouTubeIframeAPIReady();
        });

        return {
            groupName,
            myMusicList,
            player,
            onYouTubeIframeAPIReady,
        }
    },
}

</script>

<style lang="scss" scoped>
</style>
