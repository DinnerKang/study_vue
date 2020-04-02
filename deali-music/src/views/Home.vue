<template>
  <div class="home">
    <section class="my_play_list" v-if="myGroupKeys.length > 0">
      <h2>
        나의 플레이리스트
      </h2>
      <div class="group_list">
        <article v-for="data in myGroupKeys" :key="data.groupKey">
          <my-group-list :groupKey="data.groupKey" :target-name="data.targetName"></my-group-list>
        </article>
      </div>
    </section>
    <section class="recomend_play_list">
      <h2>
        공개 플레이리스트
      </h2>
      <div class="recomend_group">
        <article v-for="(list, idx) in openGroups" :key="idx" class="recomend_group_list">
          <open-group-list :openGroupData="list"></open-group-list>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api';
import MyGroupList from '@/components/list/MyGroupList';
import { getMusicListByGroup } from '@/services/Music';
import { openGroup } from '@/composible/openGroup';
import openGroupList from '@/components/list/OpenGroupList';

const myGroup = (userInfo) => {
  const myGroupKeys = ref([]);
  
  const getMyGroupList = () => {
    const data = {
      dealiName: userInfo.value.dealiName,
      groupKey: '',
    };

    getMusicListByGroup(data).once('value', snapshot =>{
        if (!snapshot.val()) return;
        const keys = Object.keys(snapshot.val()).sort(()=> Math.random() - Math.random()).splice(0,2);
        for (let i=0; i<keys.length; i+=1) {
            myGroupKeys.value.push({
            targetName: userInfo.value.dealiName,
            groupKey: keys[i],
          });
        }
        
    });
  };
  
  return {
    myGroupKeys,
    getMyGroupList,
  }
};


export default {
  name: 'Home',
  components: {
    MyGroupList,
    openGroupList,
  },
  setup(props, { root }) {
    const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
    const dealiName = computed(()=> root.$store.getters['login/getUserStatus'].dealiName);
    const { myGroupKeys, getMyGroupList } = myGroup(userInfo);

    watch(dealiName, newValue => {
       if (newValue) getMyGroupList();
    });

    return {
      myGroupKeys,
      ...openGroup(),
      dealiName,
      userInfo,
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    
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

    .recomend_group{
      display: grid;
      gap: 10px 20px;
      grid-template-rows: 250px;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 300px;

      .recomend_group{
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
