<template>
    <section class="myMusic_container" v-if="isList">
      <article class="myMusic_list_area">
        <ul>
          <li class="myMusic_list" v-for="(list, idx) in musicList" :key="idx">
            <div class="music_name">음악 : {{list.musicName}}</div>
            <button @click="removeMusic(idx)">삭제</button>
          </li>
        </ul>
      </article>
      <article>
      </article>
    </section>
</template>

<script>
import { getMusicListByGroup, deleteMusic } from '@/service/Music';
import { ref, computed, watch } from '@vue/composition-api';

const setMusicList = (props, userInfo, router ,emit) => {
    const musicList = ref([]);

    
    
    const getMusicList = () => {
        if (!userInfo.value.dealiName) {
            alert('로그인 해주세요.');
            return router.replace('/');
        }
        const data = {
          dealiName : props.groupName === 'lounge' ? 'lounge' : userInfo.value.dealiName,
          groupName: props.groupName,
          groupKey: props.groupKey || '',
        };
        getMusicListByGroup(data).on('value', (snapshot) => {
            if (!snapshot.val()) return;
              musicList.value = Object.values(snapshot.val()).reverse();
              emit('input', musicList.value);
        });
    };

    const removeMusic = (idx) => {
        const data = {
            dealiName,
            groupName: props.groupName,
        };
        
        getMusicListByGroup(data).orderByKey().once('value', snapshot => {
            if (!snapshot.val()) return;
            const key = Object.keys(snapshot.val()).reverse()[idx];
            deleteMusic(data, key);
        });
    };



    return {
        getMusicList,
        musicList,
        removeMusic,
    }
}

export default {
    name: 'MusicList',
    props: {
      value: {},
      isList: {
        type: Boolean,
        defaults: true,
      },
      groupName: {
        type: String,
      },
      groupKey: {
        type: String,
      }
    },
    setup(props, { root, emit }){

        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const dealiName = computed(() => root.$store.getters['login/getUserStatus'].dealiName);
        const { getMusicList, musicList, removeMusic } = setMusicList(props, userInfo, root.$router, emit);
        

        watch(dealiName, ()=>{
          getMusicList();
        });

        return {
            musicList,
            removeMusic,
            getMusicList,
            userInfo,
        }
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
