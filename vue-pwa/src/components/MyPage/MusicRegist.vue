<template>
    <session class="regist_container">
      <article>
        <SearchBar v-model="searchText" @click="clickSearch" />
      </article>
      <article>
          <ul>
              <li v-for="(list, idx) in searchResult.items" :key="idx">
                  <img :src='list.snippet.thumbnails.medium.url' class="thumbnails" alt="유튜브 썸네일"/>
              </li>
          </ul>
      </article>
    </session>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

import SearchBar from '../Search/SearchBar';

export default {
    name: 'MusicRegist',
    components: {
        SearchBar,
    },
    data() {
        return {
            userName: this.$store.state.userName,
            searchText: '',
            searchResult: {},
        }
    },
    methods: {
        clickSearch(payload) {
            this.searchResult = payload;
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
.thumbnails{
    width: 320px;
    height: 180px;
}
</style>