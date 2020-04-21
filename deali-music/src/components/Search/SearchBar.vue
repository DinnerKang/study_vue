<template>
    <div class="search_container">
        <input
            type="text"
            class="search_text"
            v-model="searchText"
            placeholder="검색어를 입력하세요."
            @keyup.enter="clickSearchBtn"
        />
        <button class="search_btn" @click="clickSearchBtn">검색</button>
        <img :src="searchIcon" class="search_icon" alt="검색창" />
    </div>
</template>

<script>
import { ref } from "@vue/composition-api";

const searchYoutube = router => {
    const searchText = ref("");
    const searchIcon = require("@/assets/icons/Icon_search_20x20(x2).png");
    let searchDelay = true;

    const clickSearchBtn = () => {
        if (!searchDelay) return;
        searchDelay = false;

        router.push({
            path: "/search",
            query: { q: searchText.value }
        });

        setTimeout(() => {
            searchDelay = true;
        }, 500);
    };

    return {
        clickSearchBtn,
        searchText,
        searchIcon
    };
};

export default {
    setup(props, { root }) {

        return {
            ...searchYoutube(root.$router),
        };
    }
};
</script>

<style lang="scss" scoped>
::placeholder {
    color: $Gray400;
}

.search_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $Main;
    margin: 0 auto;
    padding: 0 12px 0 32px;
    box-sizing: border-box;

    .search_text {
        width: calc(100% - 35px);
        height: 26px;
        border: none;
        background-color: $Black;
        color: $White;

        &:focus {
            outline: none;
        }
    }

    .search_btn {
        background-color: $Black;
        border: none;
        height: 26px;
        color: $Gray400;
        width: 40px;
        cursor: pointer;
    }
    .search_icon {
        position: absolute;
        left: 6px;
        width: 20px;
    }
}
</style>