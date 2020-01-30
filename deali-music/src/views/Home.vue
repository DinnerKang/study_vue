<template>
  <div class="home">
    <img class="logo_img" src="../assets/logo.png" alt="logo" >
    <router-link to="/myPage">마이페이지</router-link>
    <router-link to="/lounge">라운지</router-link>
    <melon-list></melon-list>
  </div>
</template>

<script>
import MelonList from '../components/List/MelonList';

export default {
  name: 'home',
  components: {
    MelonList
  },
  created() {
    this.onYouTubeIframeAPIReady();
  },
  methods: {
    onYouTubeIframeAPIReady() {
            const player = new YT.Player('player', {
                playerVars: {'origin':'https://vue-pwa-776e7.firebaseapp.com'},
                height: '360',
                width: '640',
                events: {
                    'onReady': this.addPlayList,
                }
            });
            this.$store.commit('setLoungePlayer', player);
        },
  },
}
</script>
<style scoped>
  .home{
    text-align: center;
  }
  .logo_img{
    display: block;
    width: 200px;
    margin: 0 auto;
  }
</style>
