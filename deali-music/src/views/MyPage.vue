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
        <modal :isOpen="isModal" @close-modal="closeModal">
            <div class="group_container">
                <div class="group_img_area">
                    <div class="thumbnail_container" v-if="isTumbnails" @scroll.passive="onScroll">
                        <div class="open_group_container" 
                        v-for="(url, idx) in thumbnailLists" :key="idx" @click="clickThumbnail(idx)">
                                <img :src="url" alt="사진" />
                        </div>
                    </div>
                    <div class="select_thumbnail" @click="getThumbnails" v-else>
                        <img v-if="selectThumbnail" :src="selectThumbnail" style="width:100%; height:100%" alt="선택한 사진"/>
                        <span v-else>썸네일 선택</span>
                    </div>
                </div>
                <div class="group_text_area">
                    <label>그룹이름<input type="text" class="group_input" v-model="groupName" placeholder="그룹이름" /></label>
                    <label>그룹설명<input type="text" class="group_input" v-model="groupDescription" placeholder="그룹설명" /></label>
                    <div>
                        <input type="radio" name="openGroup" v-model="openGroup" value="1" checked="checked" />공개
                        <input type="radio" name="openGroup" v-model="openGroup" value="0" />비공개
                    </div>
                    <button type="button" class="save_btn" @click="saveGroup(selectThumbnail)">저장</button>
                </div>
            </div>
            
            <div class="modal_footer" @click="$refs.imgFile.click()">
                이미지를 추가하고 싶다면...
                <input style="display: none;" type="file" ref="imgFile" @change="fileChange" />
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

const modalEvent = (userInfo, isTumbnails) => {
    const isModal = ref(false);
    const groupName = ref('');
    const groupDescription = ref('');
    const openGroup = ref(0);

    const saveGroup = (selectThumbnail) => {
        if (!groupName.value || !selectThumbnail.value) return alert('정보를 정확하게 입력해주세요.');
        
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

    const closeModal = () => {
        isModal.value = false;
        groupName.value = '';
        groupDescription.value = '';
        openGroup.value = 0;
        isTumbnails.value = false;
    };

    return {
        isModal,
        groupName,
        groupDescription,
        openGroup,
        saveGroup,
        closeModal,
    }
}

const thumbnailsData = (userInfo, refs) => {
    const thumbnailLists = ref([]);
    const selectThumbnail = ref('');
    const isTumbnails = ref(false);
    const fullPath = ref([]);
    let nowImg = 0;
    const perImg = 6;
    let isMoreImg = true;
    
    const getThumbnails = async () => {
        isTumbnails.value = true;
        const { items } = await readFolderLists();
        fullPath.value = items.map(i => i.fullPath);
        
        getImg();
    };

    const getImg = async () => {
        if (isMoreImg === false) return;
        for (let i = nowImg * 6; i < perImg + nowImg * perImg; i++) {
            if (i >= fullPath.value.length ) {
                isMoreImg = false;
                break;
            }
            thumbnailLists.value.push(await getThumbnail(fullPath.value[i]));
        }

        if (fullPath.value.length > nowImg * 6) isMoreImg = true;
    }

    const clickThumbnail = idx => {
        isTumbnails.value = false;
        selectThumbnail.value = thumbnailLists.value[idx];
    };

    const fileChange = () => {
        const data = {
            file: refs.imgFile.files[0],
            dealiName: userInfo.value.dealiName,
        }
        uploadThumbnail(data);
    };

    const onScroll = (e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + 182) === 0) {
            nowImg += 1;
            getImg();
        }
    };

    return {
        thumbnailLists,
        fileChange,
        getThumbnails,
        clickThumbnail,
        selectThumbnail,
        isTumbnails,
        onScroll,
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
        const { thumbnailLists, fileChange, getThumbnails, selectThumbnail, clickThumbnail, isTumbnails, onScroll } = thumbnailsData(userInfo, refs);

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
            isTumbnails,
            onScroll,
            ...modalEvent(userInfo, isTumbnails),
        };
    }
};
</script>
<style lang="scss" scoped>
    input:focus {
        outline: none;
    }

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
        display: flex;

        .group_img_area{
            width: 238px;
            height: 180px;
            border: 1px solid $Black;
            position: relative;
            
            .select_thumbnail{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }
        .group_text_area{
            margin-left: 20px;
            position: relative;

            label{
                display: block;
                margin-bottom: 20px;
                font-size:12px;

                .group_input{
                    margin-left: 20px;
                    border: none;
                    border-bottom: 1px solid $Main;
                }
            }
            .save_btn{
                width: 100%;
                color: $Black;
                height: 30px;
                border: 1px solid $Main;
                border-radius: 16px;
                background-color: $White;
                position: absolute;
                bottom: 0;
                cursor: pointer;
            }
        }
    }
    .thumbnail_container{
        position: absolute;
        top: -1px;
        width: 240px;
        height: 182px;
        overflow: auto;
        display: grid;
        z-index: 3;
        grid-template-rows: 90px;
        grid-template-columns: repeat(2, 1fr);
        
        .open_group_container{
            width: 120px;
            height: 90px;

            img{
                border-radius: 0;
                cursor: pointer;
            }
        }
    }
    
    .modal_footer{
        position: absolute;
        bottom: 0px;
        left:0;
        right: 0;
        height: 20px;
        background-color: $Black;
        color: $White;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size:12px;
    }
</style>
