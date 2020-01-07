<template>
    <session class="regist_container">
      <article>
        <SearchBar v-model="searchText" @click="clickSearch" />
      </article>
      <article class="music_list_container">
          <ul class="list_area">
            <li class="item_lists" v-for="(list, idx) in searchResult.items" :key="idx">  
                <img :src='list.snippet.thumbnails.medium.url' class="thumbnails" alt="유튜브 썸네일"/>
                <div class="text_area">
                    <h3>{{list.snippet.title}}</h3>
                    <div class="sub_text">
                        <h5>{{list.snippet.publishedAt | timeForToday}}</h5>
                        <button class="btn" @click="registData(list)">담기</button>
                    </div>
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
        registData(data) {
            const musicName = data.snippet.title;
            const videoId = data.id.videoId;
            const registDate = String(new Date());

            firebase.database().ref(`myMusic/${this.userName}`).push({
                musicName,
                videoId,
                registDate,
            });
        },
    }
}
</script>

<style lang="scss" scoped>

.music_list_container{
    margin-top: 56px;

    .list_area{
        width: 100%;
        display: grid;
        grid-template-rows: repeat(3, 300px);
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        .item_lists{
            width: 320px;

            .thumbnails{
                width: 320px;
                height: 180px;
            }
            .text_area{
                width: 320px;

                h3{
                    overflow: hidden;
                    line-height: 1.2em;
                    height: 2.2em;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .sub_text{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    
                    h5{
                        margin: 0;
                    }

                    .btn{
                        width: 56px;
                        height: 32px;
                        border: none;
                        outline: none;
                        background: red;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

</style>