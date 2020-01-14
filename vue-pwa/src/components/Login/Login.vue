<template>
  <div class="login_container">
      <div class="g-signin2" id="google_auth_btn"></div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from '../../../firebaseConfig';


export default {
    data(){
      return {
        logoImg: require('../../assets/logo.png'),
      }
    },
    created(){
        firebase.initializeApp(firebaseConfig);
        this.$store.commit('clearUser');
    },
    mounted() {
      gapi.signin2.render('google_auth_btn', {
        onsuccess: this.onSignIn
      });
    },
    methods: {
      onSignIn (user) {
        const profile = user.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
      }
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