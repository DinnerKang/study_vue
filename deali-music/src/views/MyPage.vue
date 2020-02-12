<template>
    <article class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <ul>
                <li class="group_area" v-for="(list, idx) in Object.values(groupData)"
                    :key="idx" >
                    <div @click="clickPlayList(list.groupName)">{{list.groupName}}</div>
                    <button type="button" @click="clickEdit(list.groupName, groupData)">수정</button>
                    <button type="button" @click="clickMakeAlbum(list.groupName, groupData)">DJ</button>
                </li>

                <li class="group_area">
                    <div @click="clickAddGroup">+</div>
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
import { reactive, toRefs, computed, watch } from "@vue/composition-api";
import * as firebase from "firebase/app";
import "firebase/database";
import { addMyGroup, addAlbum, editMyGroupName } from '@/service/Group';

const myGroup = (userName, userState) => {
    const state = reactive({
        groupData: {},
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
                    state.groupData = res;
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

    const clickAddGroup = () => {
        if (userState.value !== '딜리언즈') return alert('딜리언즈만 추가가 가능합니다.');
        const data = {
            groupName: '기본 그룹',
            userId: userName.value,
        };
        addMyGroup(data);
    };

    const clickEdit = (beforeName, groupData) => {

        const arr = Object.keys(groupData).map(function(key) {
            return {[key]: groupData[key]};
        });
        const res = arr.filter(i=> Object.values(i)[0].groupName === beforeName);

        const data = {
            key: Object.keys(res[0]),
            groupName: 'abc',
            userId: userName.value,
        };
        editMyGroupName(data);
    };

    const clickMakeAlbum = (beforeName, groupData) => {
        const arr = Object.keys(groupData).map(function(key) {
            return {[key]: groupData[key]};
        });
        const res = arr.filter(i=> Object.values(i)[0].groupName === beforeName);

        const data = {
            key: Object.keys(res[0]),
            userId: userName.value,
            isDJ: true,
        };

        addAlbum(data);
    };

    return {
        clickPlayList,
        clickAddGroup,
        clickEdit,
        clickMakeAlbum,
    }
}

export default {
    name: "MyPage",
    setup(props, { root }) {
        const userName = computed(()=>  root.$store.getters['login/getUserStatus'].dealiName);
        const userState = computed(() => root.$store.getters['login/getUserStatus'].userState);

        const { getMyGroup, groupData } = myGroup(userName, userState);
        const { clickPlayList, clickAddGroup, clickEdit, clickMakeAlbum } = clickEvent(userName, userState, root.$router);


        watch(userName, () =>{
            getMyGroup();
        });

        return {
            groupData,
            clickPlayList,
            clickAddGroup,
            clickEdit,
            clickMakeAlbum,
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
