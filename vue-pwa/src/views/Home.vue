<template>
  <div class="home">
    <img class="logo_img" src="../assets/logo.png" alt="Vue logo" >
    {{$store.state}}
    <router-link to="/myPage">마이페이지</router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>
<style scoped>
  .home{
    text-align: center;
  }
  .logo_img{
    width: 200px;
  }
</style>
