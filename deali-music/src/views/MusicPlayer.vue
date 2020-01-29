<template>
    <div>
        <div id="player"></div>
        <div>
            {{ musicStatus }}
            <button type="button" @click="startVideo">시작</button>
            <button type="button" @click="stopVideo">정지</button>
            <button type="button" @click="prefVideo">이전곡</button>
            <button type="button" @click="nextVideo">다음곡</button>
        </div>
        <music-list v-model="myMusicList"></music-list>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import MusicList from '../components/MyPage/MusicList';
import { videoController } from '@/service/Firebase.js';

export default {
    name: 'MusicPlayer',
    components: {
        MusicList,
    },
    data() {
        return {
            player: {},
            myMusicList: [],
            musicStatus: 'stop',
        }
    },
    watch: {
        myMusicList(newValue, oldValue) {
            if (oldValue.length === 0) {
                this.onYouTubeIframeAPIReady();
            } else{
                this.addPlayList();
            }
        },
        musicStatus(newValue) {
            console.log(newValue);
            if (newValue === 'start') this.player.playVideo();
            if (newValue === 'stop') this.player.pauseVideo();
        }
    },
    mounted() {
        this.observeLoungeStatus();
    },
    methods: {
        onYouTubeIframeAPIReady() {
            const firstVideo = this.myMusicList[0].videoId;
            this.player = new YT.Player('player', {
                playerVars: {'origin':'https://vue-pwa-776e7.firebaseapp.com'},
                height: '360',
                width: '640',
                videoId: firstVideo,
                events: {
                    'onReady': this.addPlayList,
                }
            });
        },
        addPlayList() {
            const playList = this.myMusicList.map(item => item.videoId);
            this.player.cuePlaylist({
                playlist : playList,
            });
        },
        startVideo() {
            videoController('start');
        },
        stopVideo() {
            videoController('stop');
        },
        prefVideo() {
            this.player.previousVideo();
        },
        nextVideo() {
            this.player.nextVideo();
        },
        observeLoungeStatus() {
            firebase.database()
                .ref(`control/lounge`)
                .on('value', (snapshot) => {
                    this.musicStatus = snapshot.val().status;
            });
        },
    },
}
</script>

<style lang="scss" scoped>

</style>