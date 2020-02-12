<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" :group-name="'lounge'" :is-list="true" />
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import MusicList from "../components/MyPage/MusicList";
import { addVideoStatus } from "@/service/Status";
import { ref, watch, onMounted } from "@vue/composition-api";


const youtubeData = () => {
    const myMusicList = ref([]);
    let player = ref({});
    let isReady = ref(false);
    let playList = ref([]);


    const onYouTubeIframeAPIReady = () => {
        player.value = new YT.Player("player", {
            playerVars: { 
                origin: "https://vue-pwa-776e7.firebaseapp.com",
                loop: 1, 
            },
            height: "360",
            width: "640",
            events: {
                onReady: addPlayList,
                onStateChange: stateChange
            }
        });
    };

    const addPlayList = () => {
        playList.value = myMusicList.value.map(item => item.videoId);
        player.value.cuePlaylist({
            playlist: playList.value,
        });
        isReady.value = true;
    };

    const updatePlayList = (myMusicList) => {
        player.value.cuePlaylist({
            playlist: myMusicList.value[0].videoId,
        });
        setTimeout(()=>{
            player.value.playVideo();
        }, 1000);
    };

    const stateChange = (event) => {
        if (event.data === 1 || event.data === 2) {
            const playTime = player.value.getDuration();
            const data = {
                status: event.data,
                playTime,
                videoName: myMusicList.value.filter(
                    item =>
                        item.videoId === player.value.getVideoData()["video_id"]
                )[0].musicName,
            };
            addVideoStatus(data);
        }
    };

    return {
        player,
        myMusicList,
        isReady,
        onYouTubeIframeAPIReady,
        updatePlayList,
    }
};


const youtubeStatus = () => {
    let musicStatus = ref(0);

    const observeLoungeStatus = () => {
        firebase
            .database()
            .ref(`control/lounge`)
            .on("value", snapshot => {
                musicStatus.value = snapshot.val();
            });
    };

    return {
        observeLoungeStatus,
        musicStatus,
    }
};


export default {
    name: "Lounge",
    components: {
        MusicList
    },
    setup() {
        const { player, myMusicList, isReady, onYouTubeIframeAPIReady, updatePlayList } = youtubeData();
        const { observeLoungeStatus, musicStatus } = youtubeStatus();

        watch(musicStatus, (newValue) => {
            if (!isReady.value) return;

            if (newValue.status === "start") return player.value.playVideo();
            if (newValue.status === "stop") return player.value.pauseVideo();
            if (newValue.status === "prev") return player.value.previousVideo();
            if (newValue.status === "next") return player.value.nextVideo();
        });

        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) return;
            
            if (isReady.value === true) {
                updatePlayList(myMusicList);
            } else {
                onYouTubeIframeAPIReady();
            }
        });

        onMounted(()=> observeLoungeStatus());

        return{
            player,
            myMusicList,
            musicStatus,
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
