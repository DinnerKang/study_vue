<template>
  <div id="app">
      <the-layout>
        <router-view class="main" :key="$route.fullPath" />
      </the-layout>
  </div>
</template>
<script>
import * as firebase from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import TheLayout from '@/layouts/TheLayout';

export default {
    name: 'App',
    components: { TheLayout },
    setup(){
        firebase.initializeApp(firebaseConfig);
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
 ul, li{
   list-style: none;
   margin: 0;
   padding: 0;
 }
 body{
   padding:0;
   margin: 0;
   font-family: 'Noto Sans KR', sans-serif;
 }
 a{
   text-decoration: none;
   color: $Black;
 }
 .open_group_container{
    width:238px;
    height: 180px; 
    cursor:pointer;

    img {
      width: 100%;
      height: 100%;
    }
 }
 .main{
    width: 1024px;
    min-height: calc(100vh - 128px);
    margin: 0 auto;
}
</style>