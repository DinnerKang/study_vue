<template>
    <div class="img_area">
        <img
            v-for="(data, idx) in thumbnailLists"
            :key="idx"
            :class="{ active_btn : idx === selectThumbnail }"
            :src="data"
            alt="이미지"
            @click="clickThumbnail(idx)"
        />
    </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import { getImageAll } from "@/composible/thumbnails";

const thumbnailsData = (props, emit) => {
    const selectThumbnail = computed(() => props.value);
    const thumbnailLists = getImageAll();

    const clickThumbnail = idx => {
        emit("input", idx);
    };

    return {
        selectThumbnail,
        thumbnailLists,
        clickThumbnail
    };
};

export default {
    props: {
        value: {
            type: Number
        }
    },
    setup(props, { emit }) {
        return {
            ...thumbnailsData(props, emit)
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
        border: 1px solid $White;
        cursor: pointer;
    }
    .active_btn {
        border: 1px solid $Main;
    }
}
</style>