<template>
    <div class="g-signin2" id="google-signin-btn" data-onsuccess="onSignIn" ></div>
</template>

<script>
// import { getGoogleToken } from '@/services/login/login';

export default {
    created() {
        // window.onSignIn = getGoogleToken;
    },
}
</script>

<style scoped>
    .g-signin2 {
        display: flex;
        justify-content: center;
    }
</style>