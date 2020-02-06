<template>
    <article class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <ul>
                <li class="group_area" v-for="(list, idx) in groupList" 
                    :key="idx" @click="clickPlayList(list.groupName)">
                    <div>{{list.groupName}}</div>
                </li>

                <li class="group_area">
                    <div @click="clickAddGroup">+</div>
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import * as firebase from "firebase/app";
import "firebase/database";
import { addMyGroup } from '@/service/Firebase';

const myGroup = (store, router) => {

    const state = reactive({
        groupList: [],
        groupName: '',
        dealiName: store.state.login.dealiName,
        userState: store.state.login.userState,
    });

    const clickAddGroup = () => {
        if (state.userState !== '딜리언즈') return alert('딜리언즈만 추가가 가능합니다.');
        const data = {
            groupName: 'test',
            userId: state.dealiName,
        }
        addMyGroup(data);
    }

    if (state.userState === '딜리언즈') {
      firebase
        .database()
        .ref(`group/${state.dealiName}`)
        .on("value", snapshot => {
            const res = snapshot.val();
            if (res === null) {
              const defaultData = {
                  groupName: 'default',
                  userId: state.dealiName,
              }
              addMyGroup(defaultData);
              return;
            } 
            state.groupList = Object.values(res);
      });
    }

    const clickPlayList = (groupName) => {
        router.push({
          path: '/playPage',
          query: {
            groupName: groupName
          },
        });
    }

    return {
        clickAddGroup,
        clickPlayList,
        ...toRefs(state),
    };
};

export default {
    name: "MyPage",
    setup(props, { root }) {
        
        return {
            ...myGroup(root.$store, root.$router),
        };
    }
};
</script>
<style lang="scss" scoped>
  .group_area{
    width: 200px;
    height: 100px;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
