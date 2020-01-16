<template>
    <div>
        <div id="player"></div>
    </div>
</template>

<script>
export default {
    name: 'MusicPlayer',
    data() {
        return {
            playStatus: false,
            player: '',
        }
    },
    mounted() {
        this.onYouTubeIframeAPIReady();
    },
    methods: {
        onYouTubeIframeAPIReady() {
            this.player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: 'mrAIqeULUL0',
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        },
        onPlayerReady(event) {
            event.target.playVideo();
        },
        onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !this.playStatus) {
                setTimeout(this.stopVideo, 6000);
                this.playStatus = true;
            }
        },
        stopVideo() {
            this.player.stopVideo();
        }
    },
}
</script>

<style lang="scss" scoped>

</style>