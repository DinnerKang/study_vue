<template>
  <div class="login_container">
      <button class="login_btn" @click="onSignIn">로그인</button>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import "firebase/auth";

export default {
    data(){
      return {
        logoImg: require('../../assets/logo.png'),
      }
    },
    methods: {
      async onSignIn () {
        const provider = new firebase.auth.GoogleAuthProvider();
        const profile = await firebase.auth().signInWithPopup(provider);
        console.log(profile);
        this.$store.commit('loginUser', profile);
        this.$router.push('/');
      },
    },
}
</script>

<style lang="scss" scoped>

    .login_container{
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

        .login_btn{
          background-color: #F15F5F;
          width: 160px;
          height: 40px;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 15px;

          &:hover{
            background-color: #c0392b;
          }
      }
    }
    
    
</style>