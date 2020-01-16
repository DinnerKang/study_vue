<template>
  <div class="home">
    <img class="logo_img" src="../assets/logo.png" alt="logo" >
    <router-link to="/myPage">마이페이지</router-link>
    <router-link to="/musicPlayer">음악듣기</router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
  created(){
    this.$axios.defaults.headers['authorization'] = `Bearer ${this.$store.state.accessToken}`;
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
