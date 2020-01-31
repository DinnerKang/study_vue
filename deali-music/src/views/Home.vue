<template>
  <div class="home">
    <div>
      <router-link to="/myPage">마이페이지</router-link>
    </div>
    <div>
      <router-link to="/lounge">라운지</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
<style scoped>
  .home{
    text-align: center;
  }
</style>
