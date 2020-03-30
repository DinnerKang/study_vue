<template>
    <div>
        <the-header />
        <slot />
        <the-footer v-if="isFooter" />
    </div>
</template>

<script>
import TheHeader from '../components/Menu/TheHeader';
import TheFooter from '@/components/Menu/TheFooter';
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
        // 이미지 전체 불러오기
        root.$store.dispatch('image/getAllThumbnails');

        return {
            isFooter,
        }
    }
}
</script>
