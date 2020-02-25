<template>
    <section class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <ul>
                <li class="group_area" v-for="(list, idx) in Object.values(groupData)"
                    :key="idx" >
                    <div @click="clickPlayList(list.groupName)">{{list.groupName}}</div>
                    <button type="button" @click="clickEdit(idx, groupData)">수정</button>
                    <button type="button" @click="clickMakeShow(idx, groupData)">공개</button>
                </li>

                <li class="group_area">
                    <div @click="clickAddGroup">+</div>
                </li>
            </ul>
        </div>
        <modal :isOpen="false" @close-modal="isOpen=false">
            <div>머리</div>
            <div>몸통</div>
        </modal>
    </section>
</template>

<script>
import { reactive, toRefs, computed, watch } from "@vue/composition-api";
import { getGroupList } from '@/service/Group';
import { addMyGroup, addAlbum, editMyGroupName } from '@/service/Group';
import Modal  from '@/components/Common/Modal';

const myGroup = (userName, userState) => {
    const state = reactive({
        groupData: {},
    });

    const getMyGroup = () => {
        if (userState.value === '딜리언즈') {
            getGroupList(userName.value)
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
        
        const data = {
            groupName: '기본 그룹',
            userId: userName.value,
        };
        addMyGroup(data);
    };

    const clickEdit = (idx, groupData) => {
        const key = Object.keys(groupData)[idx];
        const data = {
            key: key,
            groupName: '수정한거6',
            userId: userName.value,
        };
        editMyGroupName(data);
    };

    const clickMakeShow = (idx, groupData) => {
        const key = Object.keys(groupData)[idx];
        const data = {
            key: key,
            userId: userName.value,
            isShow: true,
        };

        addAlbum(data);
    };

    return {
        clickPlayList,
        clickAddGroup,
        clickEdit,
        clickMakeShow,
    }
}

export default {
    name: "MyPage",
    components: {
        Modal,
    },
    setup(props, { root }) {
        const userName = computed(()=>  root.$store.getters['login/getUserStatus'].dealiName);
        const userState = computed(() => root.$store.getters['login/getUserStatus'].userState);

        const { getMyGroup, groupData } = myGroup(userName, userState);
        const { clickPlayList, clickAddGroup, clickEdit, clickMakeShow } = clickEvent(userName, userState, root.$router);


        watch(userName, () =>{
            getMyGroup();
        });

        return {
            groupData,
            clickPlayList,
            clickAddGroup,
            clickEdit,
            clickMakeShow,
        };
    }
};
</script>
<style lang="scss" scoped>

    .myPage_container{
        margin: 0 auto;


    }
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
