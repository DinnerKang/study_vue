<template>
  <div class="home">
    <div>
      <router-link to="/myPage">마이페이지</router-link>
    </div>
    <music-controller class="music_control_container"></music-controller>
    <section class="melon_container">
      <article>
        <melon-list></melon-list>
      </article>
    </section>
    <dj-list></dj-list>
  </div>
</template>

<script>
import MelonList from '../components/List/MelonList';
import musicController from '@/components/MusicController';
import DjList from "../components/List/DjList";

export default {
  components: {
    MelonList,
    musicController,
    DjList
  },
}
</script>
<style lang="scss" scoped>
  .home{
    text-align: center;

    .melon_container{
      width: 50%;
    }
    .music_control_container{
      float: right;
      width: 300px;
      border: 1px solid gray;
    }
  }
</style>
