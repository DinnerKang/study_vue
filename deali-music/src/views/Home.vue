<template>
  <div class="home">
    <img class="logo_img" src="../assets/logo.png" alt="logo" >
    <router-link to="/myPage">마이페이지</router-link>
    <router-link to="/musicPlayer">음악듣기</router-link>
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
