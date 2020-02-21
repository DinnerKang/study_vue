<template>
  <div id="app">
    <main-component></main-component>
  </div>
</template>
<script>
import * as firebase from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import MainComponent from './views/Main';

export default {
    components: { MainComponent },
    created(){
        firebase.initializeApp(firebaseConfig);
    },
}
</script>

<style lang="scss">
 ul, li{
   list-style: none;
   margin: 0;
   padding: 0;
 }
 body{
   padding:0;
   margin: 0;
 }
 a{
   text-decoration: none;
   color: $Black;
 }
</style>