<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" @origin-list="getOriginList" :group-name="'lounge'" :is-list="true" />
    </div>
</template>

<script>
import MusicList from "../components/MyPage/MusicList";
import { addVideoStatus } from "@/service/Status";
import { getControlLoungeStatus } from '@/service/Control';
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

        setTimeout(()=>{
            player.value.playVideo();
        }, 1000);
    };

    const stateChange = (event) => {
        if (event.data === 1 || event.data === 2) {
            
            const data = {
                status: event.data,
                currentTime: player.value.getCurrentTime(),
                playTime: player.value.getDuration(),
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
        addPlayList,
    }
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
        musicStatus,
    }
};


export default {
    name: "Lounge",
    components: {
        MusicList
    },
    setup(props, { root }) {
        const playStyle = ref('Straight');
        const { observeLoungeStatus, musicStatus } = youtubeStatus();
        const { player, myMusicList, isReady, onYouTubeIframeAPIReady, addPlayList } = youtubeData();
        const originMusicList = ref([]);

        const getOriginList = (payload) => {
            originMusicList.value = payload;
        };
        
        watch(musicStatus, (newValue) => {
            if (!isReady.value) return;

            if (playStyle.value !== newValue.playStyle) {
                playStyle.value = newValue.playStyle;
                if (playStyle.value === 'Random') return myMusicList.value.sort(()=> Math.random() - Math.random());
                if (playStyle.value === 'Straight') return myMusicList.value = originMusicList.value;
            }

            if (newValue.status === "start") return player.value.playVideo();
            if (newValue.status === "stop") return player.value.pauseVideo();
            if (newValue.status === "prev") return player.value.previousVideo();
            if (newValue.status === "next") return player.value.nextVideo();
        });

        watch(myMusicList, () => {
            if (myMusicList.value.length === 0) return;
            
            if (isReady.value === true) {
                addPlayList();
            } else {
                onYouTubeIframeAPIReady();
            }
        });

        root.$store.commit('menu/disableFooter');
        onMounted(()=> {
            observeLoungeStatus();
        });

        return{
            player,
            myMusicList,
            musicStatus,
            getOriginList,
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
