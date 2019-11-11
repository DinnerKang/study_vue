<template>
  <div class="home">
    <input type="button" @click="onLogin" value="로그인" />
  </div>
</template>

<script>
import { testLogin } from '../service/login'

export default {
  name: 'login',
  created(){

  },
  methods:{
    async onLogin(){
      const login = await testLogin();
      console.log('login', login);
      await this.$router.push('/');
    }
  }
}
</script>
