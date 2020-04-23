<template>
    <div class="default-layout">
        <the-header />
        <slot />
        <the-footer v-if="isFooter" />
    </div>
</template>

<script>
import TheHeader from '../components/menu/TheHeader';
import TheFooter from '@/components/menu/TheFooter';
import { computed, watch } from '@vue/composition-api';

export default {
    name: 'DefaultLayout',
    components: {
        TheHeader,
        TheFooter,
    },
    setup(props, { root }){
        const store = root.$store;
        const userState = computed(()=> store.getters['login/getUserStatus'].userState);
        const isFooter = computed(() => store.getters['menu/getFooter']);

        watch(userState, () => {
            userState.value === '딜리언즈' ? store.commit('menu/showFooter') : store.commit('menu/disableFooter');
        });

        return {
            isFooter,
        }
    }
}
</script>

<style lang="scss">
html{
     background-color: $Black;
 }
</style>