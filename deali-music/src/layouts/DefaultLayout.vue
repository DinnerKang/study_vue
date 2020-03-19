<template>
    <div>
        <the-header />
        <slot />
        <the-footer />
    </div>
</template>

<script>
import TheHeader from '../components/Menu/TheHeader';
import TheFooter from '@/components/Menu/TheFooter';

export default {
    name: 'DefaultLayout',
    components: {
        TheHeader,
        TheFooter,
    },
}
</script>
