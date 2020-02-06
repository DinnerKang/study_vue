<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" :group-name="groupName" />
    </div>
</template>

<script>
import MusicList from "../components/MyPage/MusicList";
import { addVideoStatus } from "@/service/Firebase";

export default {
    name: "PlayPage",
    components: {
        MusicList
    },
    data() {
        return {
            groupName: this.$router.query.groupName,
            player: {},
            myMusicList: [],
            musicStatus: {},
            isReady: false,
        };
    },
    watch: {
        myMusicList() {
            this.onYouTubeIframeAPIReady();
        },
        musicStatus(newValue) {
            if (!this.isReady) return;
            if (newValue.status === "start") return this.player.playVideo();
            if (newValue.status === "stop") return this.player.pauseVideo();
            if (newValue.status === "prev") return this.player.previousVideo();
            if (newValue.status === "next") return this.player.nextVideo();
        }
    },
    methods: {
        onYouTubeIframeAPIReady() {
            if (this.myMusicList.length === 0) return;
            this.player = new YT.Player("player", {
                playerVars: { origin: "https://vue-pwa-776e7.firebaseapp.com" },
                height: "360",
                width: "640",
                events: {
                    // onReady: this.addPlayList,
                    // onStateChange: this.stateChange
                }
            });
        },
        addPlayList() {
            const playList = this.myMusicList.map(item => item.videoId);
            this.player.cuePlaylist({
                playlist: playList
            });
            this.isReady = true;
        },
        stateChange(event) {
            if (event.data === 1 || event.data === 2) {
                const playTime = this.player.getDuration();
                const data = {
                    status: event.data,
                    playTime,
                    videoName: this.myMusicList.filter(
                        item =>
                            item.videoId === this.player.getVideoData()["video_id"]
                    )[0].musicName,
                };
                addVideoStatus(data);
            }
        },
    }
};
</script>

<style lang="scss" scoped>
</style>