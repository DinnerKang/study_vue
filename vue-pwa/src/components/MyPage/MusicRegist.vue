<template>
    <session class="regist_container">
      <article>
        <SearchBar v-model="searchText" @click="clickSearch" />
      </article>
      <article>
          <ul>
            <li v-for="(list, idx) in searchResult.items" :key="idx">  
                <img :src='list.snippet.thumbnails.medium.url' class="thumbnails" alt="유튜브 썸네일"/>
                <div class="text_area">
                    <h3>{{list.snippet.title}}</h3>
                    <h5>{{list.snippet.publishedAt | timeForToday}}</h5>
                </div>
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
    filters: {
        timeForToday(value) {
            const today = new Date();
            const timeValue = new Date(value);

            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
            if (betweenTime < 1) return '방금전';
            if (betweenTime < 60) {
                return `${betweenTime}분전`;
            }

            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간전`;
            }

            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay < 365) {
                return `${betweenTimeDay}일전`;
            }

            return `${Math.floor(betweenTimeDay / 365)}년전`;
        },
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