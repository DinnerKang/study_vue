<template>
    <session class="myMusic_container">
      <article class="myMusic_list">
        <ul>
          <li v-for="(list, idx) in musicList" :key="idx">
            {{list}}
          </li>
        </ul>
      </article>
    </session>
</template>

<script>
import * as firebase from 'firebase';

export default {
    name: 'MusicList',
    data(){
        return {
            userName: this.$store.state.userName,
            musicList: [],
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>