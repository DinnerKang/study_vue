<template>
  <div class="home">
    <section class="my_play_list">
      <h2>
        나의 플레이리스트
      </h2>
      <div class="group_list">
        <article v-for="data in myGroupKeys" :key="data">
          <group-list :groupKey="data"></group-list>
        </article>
      </div>
    </section>
    <section class="recomend_play_list">
      <h2>
        공개 플레이리스트
      </h2>
      <div class="recomend_group_list"><!--
        <article v-for="(list, idx) in groupList" :key="idx">
          <group-list :width="'238'" :height="'180'" :is-outside="true" :list="list"></group-list>
        </article>-->
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api';
import GroupList from '@/components/List/GroupList';
import { getOpenGroup } from '@/service/Group';
import { getMusicListByGroup } from '@/service/Music';

const myGroup = (userInfo) => {
  const myGroupKeys = ref([]);
  
  const getMyGroupList = () => {
    const data = {
      dealiName: userInfo.value.dealiName,
      groupKey: '',
      groupName: '',
    };

    getMusicListByGroup(data).on('value', snapshot =>{
        const keys = Object.keys(snapshot.val()).sort(()=> Math.random() - Math.random()).splice(0,2);
        myGroupKeys.value = keys;
    });
  };
  

  return {
    myGroupKeys,
    getMyGroupList,
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
  name: 'Home',
  components: {
    GroupList,
  },
  setup(props, { root }) {
    const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
    const isLogin = computed(()=> root.$store.getters['login/getUserStatus'].dealiName);
    const { myGroupKeys, getMyGroupList } = myGroup(userInfo);
    const { groupList } = openGroup(isLogin);

    watch(isLogin, newValue => {
       if (newValue) getMyGroupList();
    });

    return {
      myGroupKeys,
      groupList,
      isLogin,
      userInfo,
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
