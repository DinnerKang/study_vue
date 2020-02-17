<template>
  <article>
      {{ groupList }}
      <ul>
          <li></li>
      </ul>
  </article>
</template>

<script>
import { getGroup } from "@/service/Group";
import { ref } from '@vue/composition-api';

const groupData = () => {
    const groupList = ref([]);

  getGroup().once("value", snapshot => {
    const keys = Object.keys(snapshot.val());
    keys.map(item => {
      getGroup()
        .child(item)
        .orderByChild("isShow")
        .equalTo(true)
        .on("child_added", snapshot => {
          
          groupList.value.push({
              name: item,
              value: snapshot.val(),
          });
        });
    });
  });

  return {
      groupList,
  }
};


export default {
  setup() {
      const { groupList } = groupData();
    return {
        groupList,
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
