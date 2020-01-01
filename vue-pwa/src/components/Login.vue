<template>
  <div class="login_container">
      <button class="google_btn" type="button" @click="loginGoogle">구글 로그인</button>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';


export default {
  data(){
    return {
      logoImg: require('../assets/logo.png'),
    }
  },
    created(){
        firebase.initializeApp(firebaseConfig);
        this.$store.commit('clearUser');
    },
    methods: {
      async loginGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await firebase.auth().signInWithPopup(provider);

        this.$store.commit('setName', user.displayName);
        this.$store.commit('setEmail', user.email);

        this.$router.push('/');
      }
    }
}
</script>

<style lang="scss" scoped>

    .login_container{
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

        .google_btn{
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