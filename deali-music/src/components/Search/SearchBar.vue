<template>
    <div class="search_container">
        <input type="text" class="search_text" v-model="searchText" placeholder="검색어" 
                    @keyup.enter="clickSearchBtn" />
        <img :src="youtubeBtnImg" class="youtube_btn" alt="유튜브 검색" @click="clickSearchBtn" />
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';
import { getYoutubeData } from '../../service/Youtube';
import youtubeKey from '../../../youtubeConfig';

const searchYoutube = (emit) => {
    const state = reactive({
        searchText: '',
    });

    const clickSearchBtn = async() => {
        try {
            const params = {
                key: youtubeKey,
                part: 'snippet',
                q: state.searchText,
                maxResult: 9,
            };
            const { data } = await getYoutubeData(params);
            console.log(data);
            const searchResult = data;
            emit('click', searchResult);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        clickSearchBtn,
        ...toRefs(state),
    }
}


export default {
    setup(props, { emit }) {
        const youtubeBtnImg = require('../../assets/youtube.jpg');
        const { clickSearchBtn, searchText } = searchYoutube(emit);
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
    width: 100%;
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