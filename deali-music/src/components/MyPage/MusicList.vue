<template>
    <section class="myMusic_container" v-if="isList">
      <article class="myMusic_list_area">
        <ul>
          <li class="myMusic_list" v-for="(list, idx) in musicList" :key="idx">
            <div class="music_name">음악 : {{list.musicName}}</div>
          </li>
        </ul>
      </article>
      <article>
      </article>
    </section>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import { ref } from '@vue/composition-api';

const setMusicList = (props, store, emit) => {

    const id = props.groupName === 'lounge' ? 'lounge' : store.state.login.dealiName;
    let musicList = ref([]);


    const getMusicList = () => {
        firebase.database()
            .ref(`music/${id}/${props.groupName}`)
            .on('value', (snapshot) => {
                musicList.value = Object.values(snapshot.val());
                emit('input', musicList.value);
        });
    }

    return {
        getMusicList,
        musicList,
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
        const { getMusicList, musicList } = setMusicList(props, root.$store, emit);
        getMusicList();

        return {
            musicList,
            getMusicList,
        }
    }
    /*

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
            const id = this.groupName === 'lounge' ? 'lounge' : this.$store.state.login.dealiName;

            firebase.database()
                .ref(`music/${id}/${this.groupName}`)
                .on('value', (snapshot) => {
                    this.musicList = Object.values(snapshot.val());
                    console.log(snapshot.val());
                    this.$emit('input', this.musicList);
            });
        },
    }*/
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
