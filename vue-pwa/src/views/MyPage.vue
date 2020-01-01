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
    <MusicList />
    <br />
    유튜브 테스트
    <p>{{test}}</p>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import MusicList from '../components/MyPage/MusicList';
import youtubeKey from '../../youtubeConfig';

export default {
  name: 'MyPage',
  component: {
    MusicList,
  },
  data(){
    return {
      userName: this.$store.state.userName,
      musicName: '',
      singerName: '',
      youtubeURL: '',

      test: [],
    }
  },
  created() {
    this.checkAPI();
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
    async checkAPI() {
      const params = {
        key: youtubeKey,
        part: 'snippet',
        q: 'vue',
        maxResult: 2,
      }
      this.test = await this.$axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
    }
  }
}
</script>
<style lang="scss" scoped>
  .myPage_container{
    text-align: center;
  }
</style>
