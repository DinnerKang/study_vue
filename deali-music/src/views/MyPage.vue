<template>
    <section class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <button @click="isModal=true">그룹 추가</button>
            <ul>
                <li class="group_area" v-for="(list, idx) in Object.values(groupData)"
                    :key="idx" >
                    <div @click="clickPlayList(list.groupName)">{{list.groupName}}</div>
                    <button type="button" @click="clickEdit(idx, groupData)">수정</button>
                    <button type="button" @click="clickMakeShow(idx, groupData)">공개</button>
                </li>
            </ul>
        </div>
        <modal :isOpen="isModal" @close-modal="isModal=false">
            <input type="text" v-model="groupName" placeholder="그룹이름" />
            <input type="text" v-model="groupDescription" placeholder="그룹설명" />
            <div>
                <input type="radio" name="openGroup" v-model="openGroup" value="1" checked="checked" />공개
                <input type="radio" name="openGroup" v-model="openGroup" value="0" />비공개
            </div>
            
            <button type="button" @click="saveGroup">저장</button>
        </modal>
    </section>
</template>

<script>
import { ref, reactive, toRefs, computed, watch, onBeforeUnmount } from "@vue/composition-api";
import { getGroupList } from '@/service/Group';
import { addMyGroup, addShowGroup, editMyGroupName } from '@/service/Group';
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
                            dealiName: userName.value,
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
        const value = Object.values(groupData)[idx];
        const data = {
            targetKey: value.myKey,
            groupName: value.groupName,
            dealiName: userName.value,
        };
        addShowGroup(data);
    };

    return {
        clickPlayList,
        clickEdit,
        clickMakeShow,
    }
}

const modalEvent = (userInfo) => {
    const isModal = ref(false);
    const groupName = ref('');
    const groupDescription = ref('');
    const openGroup = ref(0);

    const saveGroup = () => {
        if (!groupName) return alert('이름을 적어주세요.');
        const data = {
            dealiName: userInfo.value.dealiName,
            groupName: groupName.value,
            description: groupDescription.value,
            isShow: openGroup.value,
        };
        addMyGroup(data);
        isModal.value = false;
    };

    return {
        isModal,
        groupName,
        groupDescription,
        openGroup,
        saveGroup,
    }
}

export default {
    name: "MyPage",
    components: {
        Modal,
    },
    setup(props, { root }) {
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const userName = computed(()=>  root.$store.getters['login/getUserStatus'].dealiName);
        const userState = computed(() => root.$store.getters['login/getUserStatus'].userState);
        const { getMyGroup, groupData } = myGroup(userName, userState);
        const { clickPlayList, clickEdit, clickMakeShow } = clickEvent(userName, userState, root.$router);


        watch(userName, () =>{
            getMyGroup();
        });

        onBeforeUnmount(()=> {
            getGroupList().off();
        });

        return {
            groupData,
            clickPlayList,
            clickEdit,
            clickMakeShow,
            ...modalEvent(userInfo),
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
