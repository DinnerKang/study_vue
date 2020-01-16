<template>
  <div class="login_container">
      <div class="g-signin2" id="google-signin-btn"></div>
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
    },
    mounted() {
        window.addEventListener("google-loaded", this.renderGoogleLoginButton);
    },
    methods: {
      renderGoogleLoginButton() {
        gapi.signin2.render("google-signin-btn", {
          'width': 240,
          'height': 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: this.onSignIn,
        });
      },
      onSignIn (user) {
        const profile = user.getBasicProfile();
        const token = user.getAuthResponse().access_token;
        this.$store.commit('loginUser', profile);
        this.$store.commit('setToken', token);
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

        .guest_btn{
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