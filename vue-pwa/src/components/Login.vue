<template>
  <div class="login_container">
      <input type="text" placeholder="아이디" v-model="userId" />
      <input type="password" placeholder="비밀번호" v-model="userPwd" />
  </div>
</template>

<script>

export default {
   data() {
     return {
       userId: '',
       userPwd: '',
     }
   },
}
</script>

<style scoped>
</style>