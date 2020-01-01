<template>
  <div class="myPage_container">
    <h2>
      My Page
    </h2>
    <h5>
      {{ userName }}님 안녕하세요.
    </h5>
    <session class="regist_container">
      <article>
        <div>
          <input type="text" v-model="musicName" placeholder="음악 이름" />
          <input type="text" v-model="singerName" placeholder="가수 이름" />
          <input type="text" v-model="youtubeURL" placeholder="유튜브 URL" />
          <button type="submit" @click="registData">등록</button>
        </div>
      </article>
    </session>
    <session class="myMusic_container">
      <article class="myMusic_list">
        <ul>
          <li v-for="(list, idx) in musicList" :key="idx">
            {{list}}
          </li>
        </ul>
      </article>
    </session>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'MyPage',
  data(){
    return {
      userName: this.$store.state.userName,
      musicName: '',
      singerName: '',
      youtubeURL: '',
      
      musicList: [],
    }
  },
  created(){
    this.getMusicList();
  },
  methods: {
    registData() {
        firebase.database().ref(`myMusic/${this.userName}`).push({
          musicName: this.musicName,
          singerName: this.singerName,
          youtubeURL: this.youtubeURL,
          time: new Date(),
        });
    },
    getMusicList() {
      firebase.database()
          .ref(`myMusic/${this.userName}`)
          .on('value', (snapshot) => {
            this.musicList = snapshot.val();
      });
    }
  }
}
</script>
<style scoped>
  .myPage_container{
    text-align: center;
  }
</style>
