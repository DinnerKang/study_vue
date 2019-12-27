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
    created(){
        firebase.initializeApp(firebaseConfig);
        this.$store.commit('clearUser');
    },
    methods: {
      async loginGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await firebase.auth().signInWithPopup(provider);
        console.log(user);
        this.$store.commit('setName', user.displayName);
        this.$store.commit('setEmail', user.email);

        this.$router.push('/');
      }
    }
}
</script>

<style scoped>
    .google_btn{
      background-color: #F15F5F;
      width: 120px;
      height: 40px;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 15px;
    }
    .google_btn:hover{
      background-color: #c0392b;
    }
</style>