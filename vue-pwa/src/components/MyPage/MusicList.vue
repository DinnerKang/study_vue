<template>
    <section class="myMusic_container">
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

</style>