<template>
    <article class="music_container" v-if="isList">
      <div class="music_header">
        <h2>나의 플레이 리스트</h2>
        <div class="close_icon" @click="closeMenu" />
      </div>
      <ul class="music_container__list_area">
        <li class="music_container__list" v-for="(list, idx) in musicList" :key="idx">
          <div class="list_idx">{{idx + 1}}</div>
          <div class="list_info">
            <div class="list_music_register">{{list.register}}</div>
            <div class="list_muisc_name" @click="clickMusic(idx)">{{list.musicName}}</div>
          </div>
          <div class="list_duration">{{list.duration | setYoutubeTime}}</div>
          <button type="button" class="delete_btn" @click="removeMusic(idx)">X</button>
        </li>
      </ul>
    </article>
</template>

<script>
import { musicControl } from '@/services/Control';
import { getMusicListByGroup, deleteMusic } from '@/services/Music';
import { ref, computed, watch } from '@vue/composition-api';

const setMusicList = (props, emit, dealiName, isLounge) => {
    const musicList = ref([]);

    const getMusicList = () => {

        const data = {
          dealiName : isLounge ? 'lounge' : dealiName.value,
          groupKey: isLounge ? 'lounge' : props.groupKey,
        };
        
        getMusicListByGroup(data).on('value', (snapshot) => {
            if (!snapshot.val()) return;
              musicList.value = Object.values(snapshot.val()).reverse();
              emit('input', musicList.value);
        });
    };

    const removeMusic = (idx) => {
        if (!confirm('삭제하시겠습니까 ?')) return;
        const data = {
            dealiName: isLounge ? 'lounge' : dealiName.value,
            groupKey: isLounge ? 'lounge' : props.groupKey,
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
        const dealiName = computed(() => root.$store.getters['login/getUserStatus'].dealiName);
        const isLounge = props.groupName === 'lounge';
        const { getMusicList, musicList, removeMusic } = setMusicList(props, emit, dealiName, isLounge);

        const closeMenu = () => {
          emit('close-menu');
        };
        const clickMusic = (idx) => {
          if (isLounge) { 
            musicControl(idx);
          } else {
            emit('click-music', idx);
          }
        };
        
        watch(dealiName, ()=>{
          getMusicList();
        });

        return {
            musicList,
            removeMusic,
            getMusicList,
            closeMenu,
            clickMusic,
        }
    }
}
</script>

<style lang="scss" scoped>

  .music_container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: $White;
    color: $Black;
    box-shadow: 3px 0px 50px rgba(0, 0, 0, 0.05);
    
    .music_header{
      width: 100%;
      height: 45px;
      border-bottom: 1px solid $Gray400;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom: 20px;

      h2{
        margin: 0;
        font-size: 12px;
        font-weight: bold;
      }
      .close_icon{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fa8282;
        cursor: pointer;
      }
    }
    .music_container__list_area{
      overflow-y: auto;
      height: calc(100% - 65px);

      .music_container__list{
        width: 100%;
        height: 30px;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom : 20px;

          .list_idx{
            width: 40px;
            text-align: center;
          }

          .list_info{
            width: 250px;

            .list_music_register{
              font-size: 11px;
              color: $Gray400;
            }

            .list_muisc_name{
              width: 100%;
              font-size: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
          }
          .list_duration{
            font-size: 12px;
          }
          .delete_btn{
            border: none;
            background-color: $White;
            cursor: pointer;
          }
      }
    }
  }
</style>
