<template>
    <div>
        <div id="player"></div>
        <div>
            <button type="button" @click="startVideo">시작</button>
            <button type="button" @click="stopVideo">정지</button>
            <button type="button" @click="prevVideo">이전곡</button>
            <button type="button" @click="nextVideo">다음곡</button>
        </div>
        <music-list v-model="myMusicList" 
                    :is-list="false" />
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import MusicList from '../components/MyPage/MusicList';
import { videoController } from '@/service/Firebase.js';

export default {
    name: 'Lounge',
    components: {
        MusicList,
    },
    data() {
        return {
            player: {},
            myMusicList: [],
            isYoutubeLoad: false,
            musicStatus: {},
            addTime: 0,
        }
    },
    watch: {
        myMusicList() {
            this.onYouTubeIframeAPIReady();
        },
        musicStatus(newValue) {
            if (!this.isYoutubeLoad) return;
            if (newValue.status === 'start') return this.player.playVideo();
            if (newValue.status === 'stop') return this.player.pauseVideo();
            if (newValue.status === 'prev') return this.player.previousVideo();
            if (newValue.status === 'next') return this.player.nextVideo();
        }
    },
    mounted() {
        this.observeLoungeStatus();
    },
    methods: {
        onYouTubeIframeAPIReady() {
            if (this.myMusicList.length === 0) return;
            this.player = new YT.Player('player', {
                playerVars: {'origin':'https://vue-pwa-776e7.firebaseapp.com'},
                height: '360',
                width: '640',
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
        prevVideo() {
            videoController('prev');
        },
        nextVideo() {
            videoController('next');
        },
        observeLoungeStatus() {
            firebase.database()
                .ref(`control/lounge`)
                .on('value', (snapshot) => {
                    this.musicStatus = snapshot.val();
            });
        },
    },
}
</script>

<style lang="scss" scoped>

</style>