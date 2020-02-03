<template>
    <div class="search_container">
        <input type="text" class="search_text" v-model="searchText" placeholder="검색어" 
                    @keyup.enter="clickSearchBtn" />
        <img :src="youtubeBtnImg" class="youtube_btn" alt="유튜브 검색" @click="clickSearchBtn" />
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';

const searchYoutube = (router) => {
    
    const searchText = ref('');

    const clickSearchBtn = () => {

        router.push({
                path: '/search',
                query: { q : searchText },
         });
    }

    return {
        clickSearchBtn,
        searchText,
    }
}


export default {
    setup(props, { root }) {

        const youtubeBtnImg = require('../../assets/youtube.jpg');
        const { clickSearchBtn, searchText } = searchYoutube(root.$router);
        
        return {
            youtubeBtnImg,
            clickSearchBtn,
            searchText,
        };
    },
};
</script>

<style lang="scss" scoped>
.search_container{
    width: 50%;
    display: flex;
    align-items: center;
    border: 1px solid red;
    margin: 0 auto;

    .search_text{
        width: calc(100% - 56px);
        height: 32px;
        border: none;
        padding-left:12px;

        &:focus{
            outline: none;
        }
    }

    .youtube_btn{
        width: 56px;
        height: 32px;
        cursor: pointer;
    }
}
</style>