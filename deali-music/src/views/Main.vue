<template>
  <div class="home">
    <header-component></header-component>
    <search-bar class="search_bar"></search-bar>
    <router-view class="main"/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import headerComponent from '../components/Header';
import SearchBar from '../components/Search/SearchBar';
import footerComponent from '../components/Footer';

export default {
  name: 'Main',
  components: {
    headerComponent,
    SearchBar,
    footerComponent,
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