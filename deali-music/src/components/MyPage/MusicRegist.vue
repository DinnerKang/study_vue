<template>
    <section class="regist_container">
      <article class="music_list_container">
          <ul class="list_area">
            <li class="item_lists" v-for="(list, idx) in searchResult.items" :key="idx">  
                <img v-if="list.snippet.thumbnails" :src='list.snippet.thumbnails.medium.url' class="thumbnails" alt="유튜브 썸네일"/>
                <div class="text_area">
                    <h3>{{list.snippet.title | decodeStr}}</h3>
                    <div class="sub_text">
                        <h5>{{list.snippet.publishedAt | timeForToday}}</h5>
                        <button class="btn" @click="clickRegist(list)">담기</button>
                        <div v-for="(btn, idx) in groupList" :key="idx">
                            <button class="btn" @click="clickRegist(list, btn)">{{btn.groupName}}</button>
                        </div>
                    </div>
                </div>
            </li>
          </ul>
      </article>
    </section>
</template>

<script>
import { registMusic } from '@/services/Music';
import { getGroupList } from '@/services/Group';
import { computed, ref } from '@vue/composition-api';
import { decodeStr } from '@/composible/decodeStr';

const clickEvent = (userInfo) => {
    
    const clickRegist = (item, groupData='lounge') => {
        const dealiName = groupData === 'lounge' ? 'lounge' : userInfo.value.dealiName;
        const register = userInfo.value.userName;

        const searchResult = {
            thumbnails: item.snippet.thumbnails.high.url,
            musicName: decodeStr(item.snippet.title),
            videoId: item.id.videoId,
            registDate: String(new Date()),
            register: register,
            dealiName: dealiName,
            groupKey: groupData.myKey || 'lounge',
        };
        registMusic(searchResult);
    }

    return {
        clickRegist,
    }
};

const groupData = (dealiName) => {
    const groupList = ref([]);

    getGroupList(dealiName.value).on('value', snapshot=>{
        groupList.value = Object.values(snapshot.val());
    });

    return {
        groupList,
    }
};

export default {
    name: 'MusicRegist',
    props: {
        searchResult: {
            type: [Object, String],
        }
    },
    setup(props, { root }) {
        const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
        const dealiName = computed(()=> root.$store.getters['login/getUserStatus'].dealiName);
        const { clickRegist } = clickEvent(userInfo);
        const { groupList } = groupData(dealiName);
    
        return{
            clickRegist,
            groupList,
            dealiName,
        }
    },
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