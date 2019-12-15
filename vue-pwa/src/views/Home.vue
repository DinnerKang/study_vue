<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
<style scoped>
  .home{
    text-align: center;
  }
</style>
