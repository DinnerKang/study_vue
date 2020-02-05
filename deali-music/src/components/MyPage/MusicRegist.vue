<template>
    <section class="regist_container">
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
    </section>
</template>

<script>
import { addGroupMusic } from '@/service/Firebase';


export default {
    name: 'MusicRegist',
    props: {
        searchResult: {
            type: [Object, String],
        }
    },
    data() {
        return {
            userId: this.$store.state.login.dealiName,
            userName: this.$store.state.login.userName,
            searchText: '',
        }
    },
    methods: {
        registData(item) {
            const musicName = item.snippet.title;
            const videoId = item.id.videoId;
            const registDate = String(new Date());

            const data = {
                musicName,
                videoId,
                registDate,
                userId: this.userId,
                userName: this.userName,
                groupName: 'default',
            };
            
            addGroupMusic(data);
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