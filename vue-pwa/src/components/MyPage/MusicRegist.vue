<template>
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
</template>

<script>
import * as firebase from 'firebase';
export default {
    name: 'MusicRegist',
    data() {
        return {
            userName: this.$store.state.userName,
            musicName: '',
            singerName: '',
            youtubeURL: '', 
        }
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
    }
}
</script>

<style lang="scss" scoped>

</style>