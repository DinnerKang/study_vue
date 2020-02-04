<template>
  <div class="myPage_container">{{searchResult}}</div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { getYoutubeData } from "../service/Youtube.js";
import youtubeKey from "../../youtubeConfig";

const showYoutubeData = route => {
  let searchResult = ref("");
  const searchText = route.query.q.value;

  const getYotube = async () => {
    try {
      const params = {
        key: youtubeKey,
        part: "snippet",
        q: searchText,
        maxResult: 9
      };
      const { data } = await getYoutubeData(params);
      searchResult.value = data;
    } catch (e) {
      if (e.status === 403) alert('검색 API가 초과하였습니다. 커피사주세요.');
    }
  };

  return {
    searchResult,
    getYotube,
  };
};

export default {
  name: "search",
  setup(props, { root }) {
    const { searchResult, getYotube } = showYoutubeData(root.$route);
    getYotube();

    return {
      searchResult,
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
