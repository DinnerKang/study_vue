<template>
    <article class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <ul>
                <li class="group_area" v-for="(list, idx) in groupList"
                    :key="idx" >
                    <div @click="clickPlayList(list)">{{list}}</div>
                    <button type="button" @click="clickEdit(idx)">수정</button>
                </li>

                <li class="group_area">
                    <div @click="clickAddGroup(groupList)">+</div>
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
import { reactive, toRefs, computed, watch } from "@vue/composition-api";
import * as firebase from "firebase/app";
import "firebase/database";
import { addMyGroup, editMyGroupName } from '@/service/Firebase';

const myGroup = (userName, userState) => {
    const state = reactive({
        groupList: [],
    });

    const getMyGroup = () => {
        if (userState.value === '딜리언즈') {
            firebase
                .database()
                .ref(`group/${userName.value}`)
                .on("value", snapshot => {
                    const res = snapshot.val();
                    if (res === null) {
                        const defaultData = {
                            groupName: 'default',
                            userId: userName.value,
                            idx : 0,
                        }
                        addMyGroup(defaultData);
                        return;
                    }
                    state.groupList = res;
                });
        }
    };

    return {
        getMyGroup,
        ...toRefs(state),
    };
};

const clickEvent = (userName, userState, router) => {

    const clickPlayList = (groupName) => {
        router.push({
            path: '/playPage',
            query: {
                groupName: groupName
            },
        });
    };

    const clickAddGroup = (groupList) => {
        if (userState.value !== '딜리언즈') return alert('딜리언즈만 추가가 가능합니다.');
        console.log(groupList);
        const data = {
            idx: groupList.length,
            groupName: '기본 그룹',
            userId: userName.value,
        }
        addMyGroup(data);
    };

    const clickEdit = (idx) => {
        const data = {
            idx: idx,
            groupName: '수정 테스트ㅌㅌ',
            userId: userName.value,
        };
        editMyGroupName(data);
    }

    return {
        clickPlayList,
        clickAddGroup,
        clickEdit,
    }
}

export default {
    name: "MyPage",
    setup(props, { root }) {
        const userName = computed(()=>  root.$store.getters['login/getUserStatus'].dealiName);
        const userState = computed(() => root.$store.getters['login/getUserStatus'].userState);

        const { getMyGroup, groupList } = myGroup(userName, userState);
        const { clickPlayList, clickAddGroup, clickEdit } = clickEvent(userName, userState, root.$router);


        watch(userName, () =>{
            getMyGroup();
        });

        return {
            groupList,
            clickPlayList,
            clickAddGroup,
            clickEdit,
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
