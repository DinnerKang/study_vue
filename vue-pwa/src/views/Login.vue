<template>
  <div class="login_container">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login/Login.vue'

export default {
  name: 'login',
  components: {
    Login,
  }
}
</script>
<style scoped>
  .login_container{
    text-align: center;
  }
</style>
