<template>
    <section class="myPage_container">
        <article>
            <h2>내 그룹 설정</h2>
            <ul class="my_group_list">
                <li  v-for="(list, idx) in groupData" :key="idx">
                    <open-group-list :openGroupData="list" :is-likes="false">
                    </open-group-list>
                </li>
                <li class="btn_area">
                    <img class="add_btn" :src="addGroupIcon" @click="isModal=true" alt="그룹추가" />
                </li>
            </ul>
        </article>
        <modal :isOpen="isModal" @close-modal="closeModal">
            <div class="group_container">
                <div class="group_img_area">
                    <h5>썸네일 이미지</h5>
                    <div class="img_area">
                        
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
                        <h5>그룹 이름 <span class="inner_text">(/10)</span></h5>
                        <input type="text" class="group_input" v-model="groupName"/>
                    </div>
                    <div class="text_box">
                        <h5>그룹 설명 <span class="inner_text">(/10)</span></h5>
                        <input type="text" class="group_input" v-model="groupDescription"/>
                    </div>
                    <div class="radio_box">
                        <div class="radio_area">
                            <input type="radio" name="openGroup" v-model="openGroup" value="1" checked="checked" />전체공개
                            <span class="radio_text">누구나 이 그룹을 볼 수 있습니다.</span>
                        </div>
                        <div class="radio_area">
                            <input type="radio" name="openGroup" v-model="openGroup" value="0" />비공개
                            <span class="radio_text">개인만 이 그룹을 볼 수 있습니다.</span>
                        </div>
                    </div>
                    <!--
                    <label>그룹이름<input type="text" class="group_input" v-model="groupName" placeholder="그룹이름" /></label>
                    <label>그룹설명<input type="text" class="group_input" v-model="groupDescription" placeholder="그룹설명" /></label>
                    <div>
                        <input type="radio" name="openGroup" v-model="openGroup" value="1" checked="checked" />공개
                        <input type="radio" name="openGroup" v-model="openGroup" value="0" />비공개
                    </div>
                    <button type="button" class="save_btn" @click="saveGroup(selectThumbnail)">저장</button>
                    -->

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
import { ref, computed, watch, onBeforeUnmount } from "@vue/composition-api";
import { getGroupList, getLikeGroupList, addMyGroup } from '@/service/Group';
import { readFolderLists, getThumbnail } from '@/service/Storage';
import Modal  from '@/components/Common/Modal';
import OpenGroupList from '@/components/List/OpenGroupList';


const myGroup = (userInfo) => {
    const groupData = ref([]);
    const getMyGroup = () => {
        getGroupList(userInfo.value.dealiName).on("value", snapshot => {
            if (!snapshot.val()) return;
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

    return {
        getMyGroup,
        groupData,
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


const modalEvent = (userInfo, isTumbnails) => {
    const isModal = ref(false);
    const groupName = ref('');
    const groupDescription = ref('');
    const openGroup = ref(0);

    const saveGroup = (selectThumbnail) => {
        if (!groupName.value || !selectThumbnail) return alert('정보를 정확하게 입력해주세요.');
        
        const data = {
            dealiName: userInfo.value.dealiName,
            groupName: groupName.value,
            description: groupDescription.value,
            thumbnail: selectThumbnail,
            isShow: openGroup.value,
        };
        addMyGroup(data);
        closeModal();
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

const thumbnailsData = () => {
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

    const onScroll = (e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + 182) === 0) {
            nowImg += 1;
            getImg();
        }
    };

    return {
        thumbnailLists,
        getThumbnails,
        clickThumbnail,
        selectThumbnail,
        isTumbnails,
        onScroll,
    }
};

const iconData = () => {
    const editIcon = require('@/assets/icons/edit-button.png');
    const addGroupIcon = require('@/assets/icons/plus-icon.png');

    return {
        editIcon,
        addGroupIcon,
    }
};

export default {
    name: "MyPage",
    components: {
        Modal,
        OpenGroupList,
    },
    setup(props, { root }) {
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const { likeGroupList, getLikeList } = likeGroup(userInfo);
        const { getMyGroup, groupData } = myGroup(userInfo);
        const { thumbnailLists, getThumbnails, selectThumbnail, clickThumbnail, isTumbnails, onScroll } = thumbnailsData();

        watch(userInfo.value.dealiName, () =>{
            getMyGroup();
            getLikeList();
        });

        onBeforeUnmount(()=> {
            getGroupList().off();
        });
        return {
            groupData,
            thumbnailLists,
            getThumbnails,
            selectThumbnail,
            clickThumbnail,
            isTumbnails,
            onScroll,
            likeGroupList,
            ...modalEvent(userInfo, isTumbnails),
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
                }
            }
            .radio_box{
                margin-top:8px;

                .radio_area{
                    font-size: 15px;

                    .radio_text{
                        font-size: 12px;
                        color: $Gray400;
                        float:right;
                    }
                }
            }
        }
    }
</style>
