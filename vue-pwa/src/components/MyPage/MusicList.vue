<template>
    <session class="myMusic_container">
      <article class="myMusic_list">
        <ul>
          <li v-for="(list, idx) in musicList" :key="idx">
            {{list}}
          </li>
        </ul>
      </article>
      <article>
        {{playList}}
      </article>
    </session>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

import { getPlayList } from '../../service/Youtube';

export default {
    name: 'MusicList',
    data(){
        return {
            userName: this.$store.state.userName,
            musicList: [],
            playList: [],
        };
    },
    created() {
        this.getMusicList();
        this.getMyPlayList();
    },
    methods: {
        getMusicList() {
            firebase.database()
                .ref(`myMusic/${this.userName}`)
                .on('value', (snapshot) => {
                    this.musicList = snapshot.val();
            });
        },
        async getMyPlayList() {
          this.playList = await getPlayList();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>