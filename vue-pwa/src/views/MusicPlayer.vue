<template>
    <div>
        <div id="player"></div>
        <div>
            <button type="button" @click="startVideo">시작</button>
            <button type="button" @click="stopVideo">정지</button>
            <button type="button" @click="prefVideo">이전곡</button>
            <button type="button" @click="nextVideo">다음곡</button>
        </div>
        <music-list v-model="myMusicList"></music-list>
    </div>
</template>

<script>
import MusicList from '../components/MyPage/MusicList';
export default {
    name: 'MusicPlayer',
    components: {
        MusicList,
    },
    data() {
        return {
            playStatus: false,
            player: '',
            myMusicList: [],
        }
    },
    watch: {
        myMusicList() {
            if (this.myMusicList.length === 0) {
                this.onYouTubeIframeAPIReady();
            } else {
                this.addPlayList();
            }
        },
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
            this.player.loadPlaylist({
                playlist : playList,
            });
        },
        startVideo() {
            this.player.playVideo();
        },
        stopVideo() {
            this.player.pauseVideo();
        },
        prefVideo() {
            this.player.previousVideo();
        },
        nextVideo() {
            this.player.nextVideo();
        },
        
    },
}
</script>

<style lang="scss" scoped>

</style>