<template>
  <div>
    <header-menu></header-menu>
    <router-view class="main"/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderMenu from '../components/Menu/Header';
import footerComponent from '../components/Menu/Footer';

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
    width: 1024px;
  }
</style>