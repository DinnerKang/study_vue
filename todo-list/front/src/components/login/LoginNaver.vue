<template>
    <div id="naverIdLogin"></div>
</template>

<script>
import { naverService } from '@/services/login/login';
export default {
    mounted() {
        naverService().setNaver();
    },
};
</script>

<style scoped>
</style>