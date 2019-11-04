<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <input type="button" @click="onLogin" value="로그인" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){

  },
  methods:{
    async onLogin(){
      const login = await this.axios.post('/testLogin');
      console.log(login);
    }
  }
}
</script>
