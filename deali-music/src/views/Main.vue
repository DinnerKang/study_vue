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
import { computed, watch } from '@vue/composition-api';

export default {
  name: 'Main',
  components: {
    HeaderMenu,
    footerComponent,
  },
  setup(props, { root }) {
    const userState = computed(()=> root.$store.getters['login/getUserStatus'].userState);
    const isFooter = computed(()=> root.$store.getters['menu/getFooter']);

    watch(userState, ()=>{
        if(userState.value !== '딜리언즈') {
          root.$store.commit('menu/disableFooter');
        } else {
          root.$store.commit('menu/ableFooter');
        }
    });
    
    return {
      isFooter
    }
  }
}
</script>

<style lang="scss" scoped>

  .main{
    width: 1024px;
    margin: 0 auto 100px;
  }
</style>