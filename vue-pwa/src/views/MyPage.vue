<template>
  <div class="myPage_container">
    <h2>
      My Page
    </h2>
    <h5>
      {{ userName }}님 안녕하세요.
    </h5>
    <MusicRegist />
    <MusicList />
    <br />
  </div>
</template>

<script>
import MusicList from '../components/MyPage/MusicList';
import MusicRegist from '../components/MyPage/MusicRegist';
import youtubeKey from '../../youtubeConfig';

export default {
  name: 'MyPage',
  component: {
    MusicList,
    MusicRegist,
  },
  data(){
    return {
      userName: this.$store.state.userName,
      test: [],
    }
  },
  created() {
    this.checkAPI();
  },
  methods: {
    
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
