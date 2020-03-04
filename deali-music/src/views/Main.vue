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
    const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
    const isFooter = computed(()=> root.$store.getters['menu/getFooter']);

    if (!userInfo.value.dealiName) root.$store.commit('menu/disableFooter');
    
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