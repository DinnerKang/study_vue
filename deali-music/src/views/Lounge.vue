<template>
    <div>
        <div id="player"></div>
        <music-list
            v-model="myMusicList"
            :group-host="'lounge'"
            :group-name="'lounge'"
            :group-key="'lounge'"
        />
    </div>
</template>

<script>
import MusicList from "@/components/list/MusicList";
import { addVideoStatus } from "@/services/status";
import { getControlLoungeStatus } from "@/services/control";
import { ref, watch, onMounted } from "@vue/composition-api";



const youtubeData = () => {
    const myMusicList = ref([]);

    const player = ref({});
    const isReady = ref(false);
    const playList = ref([]);

    const onYouTubeIframeAPIReady = () => {
        player.value = new YT.Player("player", {
            playerVars: {
                origin:  "https://dealibeat.firebaseapp.com/",
                loop: 1
            },
            height: "360",
            width: "640",
            events: {
                onReady: initPlayList,
                onStateChange: stateChange
            }
        });
    };
    const initPlayList = () => {
        playList.value = myMusicList.value.map(item => item.videoId);
        player.value.cuePlaylist({
            playlist: playList.value
        });
        isReady.value = true;
        setTimeout(() => {
            player.value.playVideo();
        }, 1000);
    }

    const stateChange = (event) => {
        const data = {
            status: event.data,
            currentTime: player.value.getCurrentTime(),
            playTime: player.value.getDuration(),
            videoName: myMusicList.value.filter(
                item => item.videoId === player.value.getVideoData()["video_id"]
            )[0].musicName,
        };
        addVideoStatus(data);
    };

    return {
        player,
        myMusicList,
        isReady,
        onYouTubeIframeAPIReady,
        initPlayList,
    };
};

const youtubeStatus = () => {
    let musicStatus = ref({});

    const observeLoungeStatus = () => {
        getControlLoungeStatus().on("value", snapshot => {
            musicStatus.value = snapshot.val();
        });
    };

    return {
        observeLoungeStatus,
        musicStatus
    };
};

export default {
    name: "Lounge",
    components: {
        MusicList,
    },
    setup(props, { root }) {
        const { observeLoungeStatus, musicStatus } = youtubeStatus();
        const {
            player,
            myMusicList,
            isReady,
            onYouTubeIframeAPIReady,
            initPlayList,
        } = youtubeData();

        watch(musicStatus, (newValue, oldValue) => {
            if (!isReady.value) return;

            if (newValue.volume !== oldValue.volume) return player.value.setVolume(newValue.volume);
            if (newValue.idx >= 0) return player.value.playVideoAt(newValue.idx);
            if (newValue.status === "start") return player.value.playVideo();
            if (newValue.status === "stop") return player.value.pauseVideo();
            if (newValue.status === "prev") return player.value.previousVideo();
            if (newValue.status === "next") return player.value.nextVideo();
        });

        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) return;
            if (isReady.value === true) {
                initPlayList();
            } else {
                onYouTubeIframeAPIReady();
            }
        });

        root.$store.commit("menu/disableFooter");
        onMounted(() => {
            observeLoungeStatus();
        });

        return {
            myMusicList,
            musicStatus,
        };
    }
};
</script>

<style lang="scss" scoped>
</style>
