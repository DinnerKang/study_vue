<template>
  <div>
    <header-menu></header-menu>
    <router-view class="main"/>
    <footer-component v-if="isFooter"></footer-component>
  </div>
</template>

<script>
import HeaderMenu from '../components/Menu/Header';
import footerComponent from '../components/Menu/Footer';
import { computed } from '@vue/composition-api';

export default {
  name: 'Main',
  components: {
    HeaderMenu,
    footerComponent,
  },
  setup(props, { root }) {
    const store = root.$store;
    const isFooter = computed(()=> store.getters['menu/getFooter']);

    return {
      isFooter
    }
  }
}
</script>

<style lang="scss" scoped>

  .main{
    width: 1024px;
  }
</style>