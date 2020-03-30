<template>
    <div class="img_area">
        <img v-for="(data, idx) in thumbnailLists" :key="idx" 
            :class="{ active_btn : idx === selectThumbnail }"
            :src="data" alt="이미지" @click="clickThumbnail(idx)" />
    </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';

const thumbnailsData = (props, store, emit) => {
    const selectThumbnail = computed(() => props.value);
    const thumbnailLists = ref([]);
   
    const clickThumbnail = idx => {
        emit('input', idx);
    };
    const getThumbnails = () => {
        const img = computed(()=> store.getters['image/getAllImages']);
        console.log(img);
        thumbnailLists.value = img.value;
    }

    onMounted(() => getThumbnails());

    return {
        selectThumbnail,
        thumbnailLists,
        clickThumbnail,
        getThumbnails,
    }
};

export default {
    props: {
        value: {
            type: Number
        },
    },
    setup(props, { root, emit }){

        return {
            ...thumbnailsData(props, root.$store, emit),
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