<template>
  <div class="login_container">
      <input type="text" placeholder="구글 아이디" v-model="userId" />
      <input type ="password" placeholder="비밀번호" v-model="userPwd" />
      <button class="google_btn" type="button" @click="loginGoogleAuth">구글 로그인</button>
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
      userId: '',
      userPwd: '',
    }
  },
    created(){
        firebase.initializeApp(firebaseConfig);
        this.$store.commit('clearUser');
    },
    methods: {
      async loginGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        console.log(result);
        this.$store.commit('loginUser', result.user);

        this.$router.push('/'); 
      },
      async loginGoogleAuth(){
        console.log(this.userId, this.userPwd);
      },
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