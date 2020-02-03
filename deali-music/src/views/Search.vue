<template>
  <div class="myPage_container">
    {{searchResult}}
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { getYoutubeData } from '../service/Youtube.js';
import youtubeKey from '../../youtubeConfig';

const showYoutubeData = async (route) =>{
    const state = reactive({
        searchResult: '',
    });
    const searchText = route.query.q.value;
    const params = {
            key: youtubeKey,
            part: 'snippet',
            q: searchText,
            maxResult: 9,
    };

    try {
        const { data } = await getYoutubeData(params);
        state.searchResult = data;
        console.log(state);
    } catch (e) {
        console.log(e);
    }

    return {
        state,
    }
}

export default {
    setup(props, { root }) {
        const { searchResult } = showYoutubeData(root.$route);
        console.log('set', searchResult);

        return {
            searchResult,
        }
    },
};

</script>
<style lang="scss" scoped>
</style>
