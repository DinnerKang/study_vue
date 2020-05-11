<template>
    <div class="img_area">
        <img
            v-for="(data, idx) in thumbnailList"
            :key="idx"
            :class="{ active_btn : data.i === selectThumbnail }"
            :src="data.i"
            alt="이미지"
            @click="clickThumbnail(data)"
        />
        <div class="icon_area">
            <img class="add_icon" :src="addImageIcon" alt='이미지 추가' @click="$refs.file.click()" />
        </div>
        <input type="file" ref="file" @change="fileChange" style="display:none" multiple/>
    </div>
</template>

<script>
import { computed, ref } from "@vue/composition-api";
import addImageIcon from '@/assets/icons/mypage_button_40x40(x2).png';
import { getThumbnail, updateFile } from '@/services/storage';

const thumbnailsData = (props, emit) => {
    const selectThumbnail = computed(() => props.value);
    const thumbnailList = ref([]);
    
    const getThumbnails = async () => {
        thumbnailList.value = await getThumbnail(props.dealiName);
    };

    const clickThumbnail = (data) => {
        emit("input", data.i);
    };
    const file = ref('');
    const fileChange = (e) => {
        updateFile(props.dealiName, e.target.files[0]);
    };

    return {
        selectThumbnail,
        clickThumbnail,
        addImageIcon,
        thumbnailList,
        file,
        fileChange,
        ...getThumbnails(),
            
    };
};

export default {
    props: {
        value: {
            type: String,
        },
        dealiName: {
            type: String,
        }
    },
    setup(props, { emit }) {
        

        return {
            ...thumbnailsData(props, emit),
        };
    }
};
</script>

<style lang="scss" scoped>
.img_area {
    margin-top: 16px;
    width: 100%;
    height: 234px;
    display: grid;
    gap: 15px;
    grid-template-rows: 68px;
    grid-template-columns: repeat(3, 1fr);

    img {
        width: 90px;
        height: 68px;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0, 0);
        cursor: pointer;
    }
    .icon_area{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 68px;

        .add_icon{
            width: 40px;
            height: 40px;
            cursor: pointer;
        }
    }
    
    
    .active_btn {
        border: 1px solid $Main;
    }
}
</style>