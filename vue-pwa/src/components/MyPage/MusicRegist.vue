<template>
    <session class="regist_container">
      <article>
        <div>
            <div class="search_container">
                <input type="text" class="search_text" v-model="searchText" placeholder="검색어" />
                <img :src="youtubeBtn" class="youtube_btn" alt="유튜브 검색" @click="clickSearchBtn" />
            </div>
        </div>
      </article>
    </session>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import { searchYoutube } from '../../service/Youtube';
import youtubeKey from '../../../youtubeConfig';

export default {
    name: 'MusicRegist',
    data() {
        return {
            userName: this.$store.state.userName,
            youtubeBtn: require('../../assets/youtube.png'),
            result: [],
            searchText: '',
        }
    },
    methods: {
        async clickSearchBtn() {
            const params = {
                key: youtubeKey,
                part: 'snippet',
                q: this.searchText,
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

.search_container{
    width: 70%;
    display: flex;
    align-items: center;
    border: 1px solid red;
    margin: 0 auto;

    .search_text{
        width: calc(100% - 56px);
        height: 32px;
    }

    .youtube_btn{
        width: 56px;
        height: 32px;
        cursor: pointer;
    }
}
</style>