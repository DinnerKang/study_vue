<template>
  <div class="home">
    <header-menu></header-menu>
    <search-bar class="search_bar"></search-bar>
    <router-view class="main"/>
  </div>
</template>

<script>
import headerMenu from '../components/Header';
import SearchBar from '../components/Search/SearchBar';

export default {
  name: 'Main',
  components: {
    headerMenu,
    SearchBar,
  },
}
</script>

<style lang="scss" scoped>

  .search_bar{
    margin-top: 60px;
  }
  .main{
    max-width: 1024px;
    margin: 60px auto 0;
  }
</style>