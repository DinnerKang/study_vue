<template>
    <section class="myPage_container">
        <article>
            <h2>내 그룹 설정</h2>
            <ul class="my_group_list">
                <li  v-for="(list, idx) in groupData" :key="idx" class="my_group_area">
                    <open-group-list :openGroupData="list" :is-likes="false">
                    </open-group-list>
                    <div class="setting_area">
                        <img class="icon" :src="editGroupIcon" alt="수정" @click="editGroup(list)" />
                        <img class="icon" :src="deleteGroupIcon" alt="삭제" @click="deleteGroup(list)" />
                    </div>
                </li>
                <li class="btn_area" v-if="groupData.length < 8">
                    <img class="add_btn" :src="addGroupIcon" @click="isModal=true" alt="그룹추가" />
                </li>
            </ul>
        </article>
        <modal :isOpen="isModal" @close-modal="closeModal">
            <div class="group_container">
                <div class="group_img_area">
                    <h5>썸네일 이미지</h5>
                    <div class="img_area">
                        <img v-for="(data, idx) in thumbnailLists" :src="data" :key="idx" alt="이미지" />
                    </div>
                    <!--
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
                    -->

                </div>
                <div class="group_text_area">
                    <div class="text_box">
                        <h5>그룹 이름 <span class="inner_text">({{groupName.length}}/20)</span></h5>
                        <input type="text" class="group_input" v-model="groupName" maxlength="20"/>
                    </div>
                    <div class="text_box">
                        <h5>그룹 설명 <span class="inner_text">({{description.length}}/20)</span></h5>
                        <input type="text" class="group_input" v-model="description" maxlength="20"/>
                    </div>
                    <div class="radio_box">
                        <div class="radio_area">
                            <radio-btn v-model="isShowGroup" :key-value="true">전체공개</radio-btn>
                            <span class="radio_text">누구나 이 그룹을 볼 수 있습니다.</span>
                        </div>
                        <div class="radio_area">
                            <radio-btn v-model="isShowGroup" :key-value="false">비공개</radio-btn>
                            <span class="radio_text">개인만 이 그룹을 볼 수 있습니다.</span>
                        </div>
                    </div>
                    <div class="btn_area">
                        <button type="button" class="btn" >초기화</button>
                        <button type="button" class="btn" @click="saveGroup" >저장</button>
                    </div>
                </div>
            </div>
        </modal>

        <article class="my_likes">
            <h2>내가 좋아하는 그룹</h2>
            <ul class="my_group_list">
                <li  v-for="list in likeGroupList" :key="list.targetKey">
                    <open-group-list :openGroupData="list">
                    </open-group-list>
                </li>
            </ul>
        </article>
    </section>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount, reactive, toRefs } from "@vue/composition-api";
import { getGroupList, getLikeGroupList, addMyGroup, deleteMyGroup, getGroupListByKey, editMyGroupName } from '@/service/Group';

import Modal  from '@/components/Common/Modal';
import OpenGroupList from '@/components/List/OpenGroupList';
import RadioBtn from '@/components/Common/RadioBtn';


const myGroup = (userInfo) => {
    const groupData = ref([]);

    const getMyGroup = () => {
        getGroupList(userInfo.value.dealiName).on("value", snapshot => {
            if (!snapshot.val()) return;
            groupData.value = [];
            const keys = Object.keys(snapshot.val());
            const values = Object.values(snapshot.val());
            for (let i = 0; i< keys.length; i+=1) {
                groupData.value.push({
                    dealiName: userInfo.value.dealiName,
                    targetKey: values[i].myKey,
                });
            }
        });
    };

    const deleteGroup = (list) => {
        const data = {
            targetKey: list.targetKey,
            dealiName: list.dealiName,
        };
        deleteMyGroup(data);
    };

    return {
        getMyGroup,
        groupData,
        deleteGroup,
    };
};

const likeGroup = (userInfo) => {
    const likeGroupList = ref([]);

    const getLikeList = () => {
        const data = {
            dealiName: userInfo.value.dealiName,
        };
        
        getLikeGroupList(data).on('value', snapshot => {
            likeGroupList.value = [];
            if (!snapshot.val()) return;
            const keys = Object.keys(snapshot.val());
            const targetNames = Object.values(snapshot.val());
            for (let i = 0; i< keys.length; i+=1) {
                likeGroupList.value.push({
                    dealiName: targetNames[i],
                    targetKey: keys[i],
                    likes: {
                        [userInfo.value.dealiName] : true,
                    }
                });
            }
        });
    };

    return {
        likeGroupList,
        getLikeList,
    }
};


const modalEvent = (userInfo) => {
    const isModal = ref(false);
    const isEdit = ref(false);

    const groupData = reactive({
        dealiName: userInfo.value.dealiName,
        groupName: '',
        description: '',
        thumbnail: '',
        isShowGroup: true,
        targetKey: '',
    });

    const saveGroup = () => {
        isEdit.value === false ? addMyGroup(groupData) : editMyGroupName(groupData);
        closeModal();
    };

    const editGroup = (list) => {
        isEdit.value = true;

        const data = {
            dealiName: list.dealiName,
            key: list.targetKey,
        };

        getGroupListByKey(data).once('value', snapshot => {
            const result = snapshot.val();
            isModal.value = true;
            groupData.groupName = result.groupName;
            groupData.description = result.description;
            groupData.isShowGroup = result.isShowGroup;
            groupData.targetKey = list.targetKey;
        });
    };

    const closeModal = () => {
        isModal.value = false;
        isEdit.value = false;

        groupData.groupName = '';
        groupData.description = '';
        groupData.isShowGroup = '';
        groupData.thumbnail = '';
        groupData.key = '';
    };

    return {
        isModal,
        saveGroup,
        closeModal,
        editGroup,
        ...toRefs(groupData),
    }
}

const thumbnailsData = (store) => {
    const thumbnailLists = computed(() => store.getters['image/getGroupThumbnails']);
    const selectThumbnail = ref('');
   
    const clickThumbnail = idx => {
        console.log(idx);
    };

    return {
        thumbnailLists,
        selectThumbnail,
        clickThumbnail,
    }
};

const iconData = () => {
    const addGroupIcon = require('@/assets/icons/plus-icon.png');
    const editGroupIcon = require('@/assets/icons/edit-icon.png');
    const deleteGroupIcon = require('@/assets/icons/delete-icon.png');

    return {
        addGroupIcon,
        editGroupIcon,
        deleteGroupIcon,
    }
};

export default {
    name: "MyPage",
    components: {
        Modal,
        OpenGroupList,
        RadioBtn,
    },
    setup(props, { root }) {
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const { likeGroupList, getLikeList } = likeGroup(userInfo);
        const { getMyGroup, groupData, deleteGroup } = myGroup(userInfo);
        const { thumbnailLists, selectThumbnail, clickThumbnail  } = thumbnailsData(root.$store);

        watch(userInfo.value.dealiName, () =>{
            getMyGroup();
            getLikeList();
        });

        onBeforeUnmount(()=> {
            getGroupList().off();
        });
        return {
            groupData,
            deleteGroup,
            thumbnailLists,
            selectThumbnail,
            clickThumbnail,
            likeGroupList,
            ...modalEvent(userInfo),
            ...iconData(),
        };
    }
};
</script>
<style lang="scss" scoped>
    input:focus {
        outline: none;
    }

    .myPage_container{

        .my_group_list{
            display: grid;
            gap: 10px 24px;
            grid-template-rows: 250px;
            grid-template-columns: repeat(4, 1fr);

            .my_group_area{
                position: relative;

                .setting_area{
                    position: absolute;
                    right: 7px;
                    top: 148px;
                    width: 64px;
                    height: 25px;
                    display: flex;
                    justify-content: space-between;
                    visibility: hidden;

                    .icon{
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                    }
                }
                &:hover{
                    .setting_area{
                        visibility: visible;
                    }
                }
            }

            .btn_area{
                width: 238px;
                height: 180px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .add_btn{
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
        }

        .my_likes{
            margin-top: 64px;
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
        display: flex;
        padding: 0 40px;

        .group_img_area{
            width: 300px;
            height: 100%;
            position: relative;
            overflow: auto;

            h5{
                font-size: 15px;
                font-weight: bold;
                margin: 0;
            }
            .img_area {
                margin-top: 16px;
                width: 100%;
                height: 234px;
                display: grid;
                gap: 15px;
                grid-template-rows: 68px;
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .group_text_area{
            position: relative;

            .text_box{
                margin-bottom: 16px;

                h5{
                    font-size: 15px;
                    margin: 0 0 15px;
                    
                    .inner_text{
                        color: $Gray600;
                        font-weight: bold;
                    }
                }
                .group_input{
                    width: 260px;
                    height: 30px;
                    border: 1px solid $Gray400;
                    border-radius: 4px;
                    font-size: 12px;
                    padding-left: 8px;
                }
            }
            .radio_box{
                margin-top:8px;

                .radio_area{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 15px;
                    margin-bottom: 14px;

                    .radio_text{
                        font-size: 12px;
                        color: $Gray400;
                    }
                }
            }
            .btn_area{
                display: flex;
                justify-content: space-between;

                .btn{
                    outline: none;
                    width: 120px;
                    height: 30px;
                    border: 1px solid $Gray400;
                    border-radius: 15px;
                    color: $Gray600;
                    font-weight: bold;
                    font-size: 15px;
                    padding: 0;
                    cursor: pointer;
                }
            }
        }
    }
</style>
