<template>
    <div class="search_container">
        <input type="text" class="search_text" v-model="searhText" placeholder="검색어" 
                    @keyup.enter="clickSearchBtn" />
        <img :src="youtubeBtn" class="youtube_btn" alt="유튜브 검색" @click="clickSearchBtn" />
    </div>
</template>

<script>
import { searchYoutube } from '../../service/Youtube';

export default {
    name: 'searchBar',
    props: {
        value: {
            type: String,
        },
    },
    data() {
        return {
            youtubeBtn: require('../../assets/youtube.jpg'),
            searhText: this.value,
        }
    },
    methods: {
        async clickSearchBtn() {
            const maxResults = 9;
            const q = this.searhText;
            const { data } = await searchYoutube(q, maxResults);
            this.$emit('click', data);
        },
    }
}
</script>

<style lang="scss" scoped>
.search_container{
    width: 70%;
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