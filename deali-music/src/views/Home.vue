<template>
  <div class="home">
    <section class="my_play_list">
      <h2>
        나의 플레이리스트
      </h2>
      <div class="group_list">
        <article v-for="(list, idx) in playList" :key="idx">
          <group-list :list="list"></group-list>
        </article>
      </div>
    </section>
    <section class="recomend_play_list">
      <h2>
        공개 플레이리스트
      </h2>
      <div class="recomend_group_list">
        <article v-for="(list, idx) in groupList" :key="idx">
          <group-list :width="'238'" :height="'180'" :is-outside="true" :list="list"></group-list>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import GroupList from '@/components/List/GroupList';
import { getGroupList, getOpenGroup } from '@/service/Group';

const myGroup = (store) => {
  const playList = ref([]);
  
  getGroupList(store.state.login.dealiName).on('value', snapshot => {
      if (!snapshot.val()) return;
      if (store.state.dealiName === '') return;
      playList.value = Object.values(snapshot.val()).sort(()=> Math.random() - Math.random()).splice(0,2);
  });

  return {
    playList,
  }
};

const openGroup = () => {
  const groupList = ref([]);
  const likeGroupList = ref([]);
  
  getOpenGroup().once('value', snapshot => {
    if (!snapshot.val()) return;
    groupList.value = Object.values(snapshot.val());
  });
  
  return {
    groupList,
    likeGroupList,
  }
};

export default {
  components: {
    GroupList,
  },
  setup(props, { root }) {
    const isLogin = computed(()=> root.$store.getters['login/getUserStatus'].dealiName);
    const { playList } = myGroup(root.$store);
    const { groupList } = openGroup(isLogin);

    return {
      playList,
      groupList,
      isLogin,
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    margin: 0 auto;
    
    section{
      margin-top: 64px;

      h2{
        font-size:28px;
        margin-bottom: 32px;
      }
      .group_list{
        display: flex;
        justify-content: space-between;
      }
    }
    .my_play_list{
      margin-bottom: 48px;
    }

    .recomend_group_list{
      display: grid;
      gap: 10px 24px;
      grid-template-rows: 150px;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 300px;
    }
  }
</style>
