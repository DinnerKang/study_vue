<template>
  <div class="myPage_container">
    <music-regist :search-result="searchResult"></music-regist>
  </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import { getYoutubeData } from "../service/Youtube.js";
import youtubeKey from "../../youtubeConfig";

import MusicRegist from '@/components/myPage/MusicRegist';

const showYoutubeData = () => {
  let searchResult = ref("");

  const getYotube = async (searchText) => {
    try {
      const params = {
        key: youtubeKey,
        part: "snippet",
        q: searchText,
        maxResults: 9
      };
      const { data } = await getYoutubeData(params);
      searchResult.value = data;
    } catch (e) {
      if (e.status === 403) alert('검색 사용량이 초과하였습니다. 추가하실려면 커피사주세요.');
    }
  };

  return {
    searchResult,
    getYotube,
  };
};

export default {
  name: "search",
  components: {MusicRegist},
  setup(props, { root }) {
    
    const { searchResult, getYotube } = showYoutubeData();
    watch(() => {
      getYotube(root.$route.query.q);
    });
    return {
      searchResult,
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
