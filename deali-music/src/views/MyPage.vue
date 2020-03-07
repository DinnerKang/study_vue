<template>
    <section class="myPage_container">
        <article>
            <h2>내 그룹 설정</h2>
            <button @click="isModal=true">그룹 추가</button>
            <ul class="my_group_list">
                <li  v-for="(list, idx) in groupData" :key="idx">
                    <my-group-list :group-key="list.groupKey" :target-name="list.targetName"
                        :bottomPadding="'8px 24px'" :width="'238'" :height="'180'" :group-thumbnail="true">
                    </my-group-list>
                </li>
            </ul>
        </article>
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
        </modal>

        <article class="my_likes">
            <h2>내가 좋아하는 그룹</h2>
            <ul class="my_group_list">
                <li  v-for="list in likeGroupList" :key="list.groupKey">
                    <my-group-list :group-key="list.groupKey" :target-name="list.targetName"
                        :bottomPadding="'8px 24px'" :width="'238'" :height="'180'" :group-thumbnail="true">
                    </my-group-list>
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
import MyGroupList from '@/components/List/MyGroupList';


const myGroup = (userInfo) => {
    const groupData = ref([]);

    const getMyGroup = () => {
        getGroupList(userInfo.value.dealiName).on("value", snapshot => {
            if (!snapshot.val()) return;
            const keys = Object.keys(snapshot.val());
            const values = Object.values(snapshot.val());
            for (let i = 0; i< keys.length; i+=1) {
                groupData.value.push({
                    targetName: userInfo.value.dealiName,
                    groupKey: values[0].myKey,
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
        
        getLikeGroupList(data).once('value', snapshot => {
            const keys = Object.keys(snapshot.val());
            const targetNames = Object.values(snapshot.val());
            
            for (let i = 0; i< keys.length; i+=1) {
                likeGroupList.value.push({
                    targetName: targetNames[i],
                    groupKey: keys[i],
                })
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

    return {
        editIcon,
    }
};

export default {
    name: "MyPage",
    components: {
        Modal,
        MyGroupList,
    },
    setup(props, { root }) {
        const userInfo = computed(() => root.$store.getters['login/getUserStatus']);
        const { getMyGroup, groupData } = myGroup(userInfo);
        const { thumbnailLists, getThumbnails, selectThumbnail, clickThumbnail, isTumbnails, onScroll } = thumbnailsData();
        const { likeGroupList, getLikeList } = likeGroup(userInfo);

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
</style>
