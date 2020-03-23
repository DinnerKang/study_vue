<template>
    <component :is="layout" >
        <router-view class="main" />
    </component>
</template>

<script>
import { computed } from '@vue/composition-api';
import DefaultLayout from './DefaultLayout';
import MobileLayout from './MobileLayout';

export default {
    name: 'TheLayout',
    components: {
        DefaultLayout,
        MobileLayout,
    },
    setup(props, { root }){
        const layout = computed(() => root.$route.meta.layout || 'DefaultLayout' );

        return {
            layout,
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