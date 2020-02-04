<template>
    <div>
        <div id="player"></div>
        <music-list v-model="myMusicList" :is-list="false" />
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";
import MusicList from "../components/MyPage/MusicList";
import { addVideoStatus } from "@/service/Firebase";

export default {
    name: "Lounge",
    components: {
        MusicList
    },
    data() {
        return {
            player: {},
            myMusicList: [],
            musicStatus: {},
            isReady: false
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
    mounted() {
        this.observeLoungeStatus();
    },
    methods: {
        onYouTubeIframeAPIReady() {
            if (this.myMusicList.length === 0) return;
            this.player = new YT.Player("player", {
                playerVars: { origin: "https://vue-pwa-776e7.firebaseapp.com" },
                height: "360",
                width: "640",
                events: {
                    onReady: this.addPlayList,
                    onStateChange: this.stateChange
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
            console.log(event.data);

            const data = {
                status: event.data,
                videoName: this.myMusicList.filter(
                    item =>
                        item.videoId === this.player.getVideoData()["video_id"]
                )[0].musicName
            };
            if (data.status === 1 || data.status === 2) {
                console.log('hi');
                addVideoStatus(data);
            }
        },
        observeLoungeStatus() {
            firebase
                .database()
                .ref(`control/lounge`)
                .on("value", snapshot => {
                    this.musicStatus = snapshot.val();
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>