<template>
    <section class="myPage_container">
        <div>
            <h2>내 그룹 설정</h2>
            <button @click="isModal=true">그룹 추가</button>
            <ul class="my_group_list">
                <li  v-for="list in Object.keys(groupData)" :key="list">
                    <my-group-list :group-key="list" :bottomPadding="'8px 24px'"
                            :width="'238'" :height="'180'" :group-thumbnail="true">
                        
                    </my-group-list>
                </li>
            </ul>
        </div>
        <modal :isOpen="isModal" @close-modal="isModal=false">
            <div class="group_container">
                <div class="group_img_area">
                    <img v-if="selectThumbnail" :src="selectThumbnail" style="width:100%; height:100%" alt="선택한 사진"/>
                </div>
            </div>
            
            <div>
                <button type="button" @click="getThumbnails">이미지 부르기</button>
                <input type="file" ref="imgFile" @change="fileChange" />
            </div>
            <input type="text" v-model="groupName" placeholder="그룹이름" />
            <input type="text" v-model="groupDescription" placeholder="그룹설명" />
            <div>
                <input type="radio" name="openGroup" v-model="openGroup" value="1" checked="checked" />공개
                <input type="radio" name="openGroup" v-model="openGroup" value="0" />비공개
            </div>
            <button type="button" @click="saveGroup(selectThumbnail)">저장</button>
            
            <div class="open_group_container" v-for="(url, idx) in thumbnailLists" :key="idx" @click="clickThumbnail(idx)">
                <img :src="url" alt="사진" />
            </div>
        </modal>
    </section>
</template>

<script>
import { ref, reactive, toRefs, computed, watch, onBeforeUnmount } from "@vue/composition-api";
import { getGroupList } from '@/service/Group';
import { readFolderLists, getThumbnail, uploadThumbnail } from '@/service/Storage';
import { addMyGroup } from '@/service/Group';
import Modal  from '@/components/Common/Modal';
import MyGroupList from '@/components/List/MyGroupList';

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

const modalEvent = (userInfo) => {
    const isModal = ref(false);
    const groupName = ref('');
    const groupDescription = ref('');
    const openGroup = ref(0);

    const saveGroup = (selectThumbnail) => {
        if (!groupName) return alert('이름을 적어주세요.');
        
        const data = {
            dealiName: userInfo.value.dealiName,
            groupName: groupName.value,
            description: groupDescription.value,
            thumbnail: selectThumbnail,
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

const thumbnailsData = () => {
    const thumbnailLists = ref([]);
    const selectThumbnail = ref('');
    
    const getThumbnails = async() => {
        const { items } = await readFolderLists();
        const fullPath = items.map(i => i.fullPath);

        for (let i = 0; i < fullPath.length; i += 1) {
            thumbnailLists.value.push(await getThumbnail(fullPath[i]));
        }
    };

    const clickThumbnail = idx => {
        selectThumbnail.value = thumbnailLists.value[idx];
    };

    const fileChange = () => {
        const file = refs.imgFile.files[0];
        uploadThumbnail(file);
    };

    return {
        thumbnailLists,
        fileChange,
        getThumbnails,
        clickThumbnail,
        selectThumbnail,
    }
}

export default {
    name: "MyPage",
    components: {
        Modal,
        MyGroupList,
    },
    setup(props, { root, refs }) {
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const userName = computed(()=>  root.$store.getters['login/getUserStatus'].dealiName);
        const userState = computed(() => root.$store.getters['login/getUserStatus'].userState);
        const { getMyGroup, groupData } = myGroup(userName, userState);
        const { thumbnailLists, fileChange, getThumbnails, selectThumbnail, clickThumbnail } = thumbnailsData(refs);

        watch(userName, () =>{
            getMyGroup();
        });

        onBeforeUnmount(()=> {
            getGroupList().off();
        });

        return {
            groupData,
            thumbnailLists,
            fileChange,
            getThumbnails,
            selectThumbnail,
            clickThumbnail,
            ...modalEvent(userInfo, refs),
        };
    }
};
</script>
<style lang="scss" scoped>

    .myPage_container{
        margin: 0 auto;

        .my_group_list{
            display: grid;
            gap: 10px 24px;
            grid-template-rows: 250px;
            grid-template-columns: repeat(4, 1fr);
            margin-bottom: 300px;
        }
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
  
    .group_container{
        padding: 20px;

        .group_img_area{
            width: 238px;
            height: 180px;
            border: 1px solid $Black;
        }
    }
</style>
