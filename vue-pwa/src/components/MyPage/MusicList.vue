<template>
    <section class="myMusic_container">
      <article class="myMusic_list_area">
        <ul>
          <li class="myMusic_list" v-for="(list, idx) in musicList" :key="idx">
            <div class="music_name">음악 : {{list.musicName}}</div>
          </li>
        </ul>
      </article>
      <article>
        <router-link to="/musicPlayer">musicPlayer</router-link>
      </article>
    </section>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

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
    },
    methods: {
        getMusicList() {
            firebase.database()
                .ref(`myMusic/${this.userName}`)
                .on('value', (snapshot) => {
                    this.musicList = snapshot.val();
            });
        },
    }
}
</script>

<style lang="scss" scoped>

    .myMusic_list{
      width: 300px;
      height: 80px;
      padding: 20px;
      box-sizing: border-box;
      border: 1px solid #000;
      border-radius: 20px;
      display: flex;
      align-items: center;

        .music_name{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
    }
</style>