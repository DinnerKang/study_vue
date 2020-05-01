<template>
  <div class="myPage_container">
    <search-regist :search-result="searchResult"></search-regist>
  </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import { getYoutubeData } from "@/services/youtube.js";

import SearchRegist from '@/components/search/SearchRegist';

const showYoutubeData = () => {
  let searchResult = ref("");

  const getYotube = async (searchText) => {
    try {
      const { data } = await getYoutubeData(searchText);
      searchResult.value = data;
    } catch (e) {
      if (e.status === 403) alert('검색 사용량이 초과하였습니다. 추가하실려면 커피사주세요 ㅎㅅㅎ');
    }
  };

  return {
    searchResult,
    getYotube,
  };
};

export default {
  name: "search",
  components: { SearchRegist },
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
