<template>
    <img class="kakao_btn" src="@/assets/login/kakao_login_medium_narrow.png" @click="loginWithKakao" />
</template>

<script>

export default {
    name: "LoginKakao",
    methods: {
        loginWithKakao() {
            const params = {
                redirectUri: "http://localhost:8080/auth",
            };
            window.Kakao.Auth.authorize(params);
        },
    },
};
</script>

<style scoped>
.kakao_btn {
    cursor: pointer;
}
</style>