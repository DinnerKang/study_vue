<template>
    <article class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <ul>
                <li class="group_area" v-for="(list, idx) in groupList" :key="idx">
                    <div v-if="!isGroupList[idx+1]">{{list}}<button type="button" @click="isGroupList[idx+1] = true">수정</button></div>
                    <!-- <div>
                      <div v-if="!isEdit">
                        <span>{{defaultGroupName}}</span><button @click="isEdit=true">수정</button>
                      </div>
                      <div v-if="isEdit" >
                        <input type="text" v-model="groupName" placeholder="그룹 이름"/>
                        <button type="button" @click="editGroup('기본 그룹1')">저장</button>
                      </div>
                    </div> -->
                </li>

                <!-- <li class="group_area" @click.self.prevent="clickAddGroup">
                    <div>+</div>
                    <div>
                      <div v-if="!isEdit">
                        <span>{{defaultGroupName}}</span><button @click="isEdit=true">수정</button>
                      </div>
                      <div v-if="isEdit" >
                        <input type="text" v-model="groupName" placeholder="그룹 이름"/>
                        <button type="button" @click="editGroup('기본 그룹1')">저장</button>
                      </div>
                    </div>
                </li> -->
            </ul>
        </div>
    </article>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import * as firebase from "firebase/app";
import "firebase/database";
import { addMyGroup, editMyGroup } from '@/service/Firebase';

const myGroup = store => {
    let groupList = ref([]);
    let groupName = ref('');
    const isEdit = ref(false);
    let isGroupList = ref([]);

    watch(() => groupList, (groupList) => {
        console.log('gro', groupList);
        isGroupList = groupList;
        console.log(isGroupList);
    });

    let i = ref(1);
    const defaultGroupName = ref(`기본 그룹${i}`);

    const { dealiName, userState } = store.state.login;
    
    if (dealiName) {
      firebase
        .database()
        .ref(`music/group/${dealiName}`)
        .once("value", snapshot => {
            const res = snapshot.val();
            groupList.value = res;
      });
    }
    

    const clickAddGroup = () => {
        if (userState !== '딜리언즈') return alert('딜리언즈만 추가가 가능합니다.');
        console.log('click');
        const data = {
            groupName: defaultGroupName.value,
            userId: dealiName,
        }
        addMyGroup(data);

        i.value = i.value + 1;
    }

    const editGroup = () => {
        console.log('edi');
        const data = {
            groupName: groupName.value,
            userId: dealiName,
        }
        editMyGroup(data);
    };

    return {
        groupList,
        editGroup,
        clickAddGroup,
        groupName,
        isEdit,
        isGroupList,
        defaultGroupName,
    };
};

export default {
    name: "MyPage",
    setup(props, { root }) {
        const { groupList, editGroup, clickAddGroup, groupName, isEdit, isGroupList, defaultGroupName } = myGroup(root.$store);

        return {
            groupList,
            editGroup,
            clickAddGroup,
            groupName,
            isEdit,
            isGroupList,
            defaultGroupName,
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
