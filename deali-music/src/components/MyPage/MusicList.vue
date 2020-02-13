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
import { ref } from '@vue/composition-api';

const setMusicList = (props, store, emit) => {

    const id = props.groupName === 'lounge' ? 'lounge' : store.state.login.dealiName;
    let musicList = ref([]);

    const getMusicList = () => {
        const data = {
          id,
          groupName: props.groupName,
        };

        getMusicListByGroup(data).on('value', (snapshot) => {
                musicList.value = Object.values(snapshot.val()).reverse();
                emit('input', musicList.value);
        });
    }

    const removeMusic = (idx) => {
        const data = {
            id,
            groupName: props.groupName,
        };
        
        getMusicListByGroup(data).orderByKey().once('value', snapshot => {
            const key = Object.keys(snapshot.val()).reverse()[idx];
            deleteMusic(data, key);
        });
    }

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
      }
    },
    setup(props, { root, emit }){
        const { getMusicList, musicList, removeMusic } = setMusicList(props, root.$store, emit);
        getMusicList();

        return {
            musicList,
            getMusicList,
            removeMusic,
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
