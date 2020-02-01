<template>
  <div class="home">
    <header-menu></header-menu>
    <router-view class="main"/>
  </div>
</template>

<script>
import headerMenu from '../components/Header';

export default {
  name: 'Main',
  components: {
    headerMenu,
  },
}
</script>

<style lang="scss" scoped>
  .main{
    max-width: 1024px;
    margin: 0 auto;
  }
</style>