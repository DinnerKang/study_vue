<template>
  <div class="login_container">
    구글 로그인 해주세요.
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

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
