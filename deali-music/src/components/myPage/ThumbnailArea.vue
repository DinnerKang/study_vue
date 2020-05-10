<template>
    <div class="img_area">
        <img
            v-for="(data, idx) in thumbnailList"
            :key="idx"
            :class="{ active_btn : idx === selectThumbnail }"
            :src="data.i"
            alt="이미지"
            @click="clickThumbnail(idx)"
        />
        <div class="icon_area">
            <img class="add_icon" :src="addImageIcon" alt='이미지 추가' @click="openFile" />
        </div>
    </div>
</template>

<script>
import { computed, ref } from "@vue/composition-api";
import addImageIcon from '@/assets/icons/mypage_button_40x40(x2).png';
import { getThumbnail } from '@/services/storage';

const thumbnailsData = (props, emit) => {
    const selectThumbnail = computed(() => props.value);
    const thumbnailList = ref([]);

    const getThumbnails = async () => {
        thumbnailList.value = await getThumbnail(props.dealiName);
    };

    const clickThumbnail = async (idx) => {
        emit("input", idx);
    };

    return {
        selectThumbnail,
        clickThumbnail,
        addImageIcon,
        thumbnailList,
        ...getThumbnails(),
    };
};

export default {
    props: {
        value: {
            type: Number,
        },
        dealiName: {
            type: String,
        }
    },
    setup(props, { emit }) {
        const openFile = () => {
        };

        return {
            ...thumbnailsData(props, emit),
            openFile,
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