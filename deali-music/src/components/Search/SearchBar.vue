<template>
    <div class="search_container">
        <input type="text" class="search_text" v-model="searchText" placeholder="검색어" 
                    @keyup.enter="clickSearchBtn" />
        <button class="youtube_btn" @click="clickSearchBtn">검색</button>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';

const searchYoutube = (router) => {
    
    const searchText = ref('');
    let searchDelay = true;


    const clickSearchBtn = () => {
        if (!searchDelay) return;
        searchDelay = false;

        router.push({
                path: '/search',
                query: { q : searchText.value },
         });
         
        setTimeout(()=>{
            searchDelay = true;
        }, 500);
    }

    return {
        clickSearchBtn,
        searchText,
    }
}


export default {
    setup(props, { root }) {

        const { clickSearchBtn, searchText } = searchYoutube(root.$router);
        
        return {
            clickSearchBtn,
            searchText,
        };
    },
};
</script>

<style lang="scss" scoped>
.search_container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #000;
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