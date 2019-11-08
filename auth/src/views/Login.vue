<template>
  <div class="home">
    <input type="button" @click="onLogin" value="로그인" />
  </div>
</template>

<script>

export default {
  name: 'login',
  created(){

  },
  methods:{
    async onLogin(){
      const login = await this.axios.post('/testLogin');
      console.log(login);
      this.$router.push('/');
    }
  }
}
</script>
