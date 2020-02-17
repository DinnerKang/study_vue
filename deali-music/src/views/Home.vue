<template>
  <div class="home">
    <div>
      <router-link to="/myPage">마이페이지</router-link>
    </div>
    <music-controller class="music_control_container"></music-controller>
    <show-list></show-list>
  </div>
</template>

<script>
import musicController from '@/components/MusicController';
import ShowList from "../components/List/ShowList";

export default {
  components: {
    musicController,
    ShowList
  },
}
</script>
<style lang="scss" scoped>
  .home{
    text-align: center;

    .music_control_container{
      float: right;
      width: 300px;
      border: 1px solid gray;
    }
  }
</style>
