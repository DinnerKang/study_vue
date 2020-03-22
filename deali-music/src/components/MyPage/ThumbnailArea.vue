<template>
    <div class="img_area">
        <img v-for="(data, idx) in thumbnailLists" :key="idx" 
            :class="{ active_btn : idx === selectThumbnail }"
            :src="data" alt="이미지" @click="clickThumbnail(idx)" />
    </div>
</template>

<script>
import { computed } from '@vue/composition-api';

const thumbnailsData = (props, store, emit) => {
    const thumbnailLists = computed(() => store.getters['image/getGroupThumbnails']);
    const selectThumbnail = computed(() => props.value);
   
    const clickThumbnail = idx => {
        emit('input', idx);
    };

    return {
        thumbnailLists,
        selectThumbnail,
        clickThumbnail,
    }
};

export default {
    props: {
        value: {
            type: Number
        },
    },
    setup(props, { root, emit }){
        const { thumbnailLists, clickThumbnail, selectThumbnail } = thumbnailsData(props, root.$store, emit);
        return {
            thumbnailLists,
            clickThumbnail,
            selectThumbnail
        }
    }
}
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

        img{
            width: 90px;
            height: 68px;
            box-sizing: border-box;
            border: 1px solid $White;
            cursor: pointer;
        }
        .active_btn{
            border: 1px solid $Main;
        }
    }
</style>