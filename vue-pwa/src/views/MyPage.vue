<template>
  <div class="myPage_container">
    <input type="text" placeholder="음악 이름" />
    <input type="text" placeholder="유튜브 URL" />
    <button type="submit" @click="registData">등록</button>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'MyPage',
  data(){
    return {
       musicName: '',
       youtubeURL: '',
    }
  },
  methods: {
    registData() {
        firebase.database().ref('myMusic/' + this.$store.state.username).set({
          musicName: this.musicName,
          youtubeURL: this.youtubeURL || '',
        });
    },
  }
}
</script>
<style scoped>
  .myPage_container{
    text-align: center;
  }
</style>
