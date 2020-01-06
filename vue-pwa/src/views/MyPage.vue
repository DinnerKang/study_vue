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
}
</script>
<style lang="scss" scoped>
  .myPage_container{
    text-align: center;
  }
</style>
