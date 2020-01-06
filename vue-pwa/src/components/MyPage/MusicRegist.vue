<template>
    <session class="regist_container">
      <article>
        <div>
          <input type="text" v-model="musicName" placeholder="검색어" />
          <img :src="youtubeBtn" alt="유튜브 검색" @click="clickSearchBtn" />
          
          <button type="button" @click="registData">등록</button>
          {{ result }}
        </div>
      </article>
    </session>
</template>

<script>
import * as firebase from 'firebase';
import { searchYoutube } from '../../service/Youtube';
import youtubeKey from '../../../youtubeConfig';

export default {
    name: 'MusicRegist',
    data() {
        return {
            userName: this.$store.state.userName,
            youtubeBtn: require('../../assets/youtube.png'),
            result: [],
            musicName: '',
            singerName: '',
        }
    },
    methods: {
        async clickSearchBtn() {
            const params = {
                key: youtubeKey,
                part: 'snippet',
                q: 'vue',
                maxResult: 2,
            }
            this.result = await searchYoutube(params);
        },
        registData() {
            firebase.database().ref(`myMusic/${this.userName}`).push({
                musicName: this.musicName,
                singerName: this.singerName,
                time: new Date(),
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .youtubeBtn{
        width: 120px;
        height: 46px;
    }
</style>