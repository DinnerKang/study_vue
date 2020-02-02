<template>
  <div class="home">
    <header-menu></header-menu>
    <search-bar class="search_bar"></search-bar>
    <router-view class="main"/>
  </div>
</template>

<script>
import headerMenu from '../components/Header';
import searchBar from '../components/Search/SearchBar';

export default {
  name: 'Main',
  components: {
    headerMenu,
    searchBar,
  },
}
</script>

<style lang="scss" scoped>
  .search_bar{
      max-width: 1024px;
      width: 50%;
      margin-top: 80px;
  }
  .main{
    max-width: 1024px;
    margin: 0 auto;
  }
</style>