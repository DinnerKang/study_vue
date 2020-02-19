<template>
  <div class="home">
    <header-menu></header-menu>
    <router-view class="main"/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderMenu from '../components/Menu/Header';
import footerComponent from '../components/Footer';

export default {
  name: 'Main',
  components: {
    HeaderMenu,
    footerComponent,
  },
}
</script>

<style lang="scss" scoped>

  .main{
    max-width: 1024px;
    margin: 60px auto 0;
  }
</style>