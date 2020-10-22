<template>
    <img class="kakao_btn" src="@/assets/login/kakao_login_medium_narrow.png" @click="loginWithKakao" />
</template>

<script>

const loginWithKakao = () => {
    const params = {
        redirectUri: "http://localhost:8080/auth",
    };
    window.Kakao.Auth.authorize(params);
};

export default {
    name: "LoginKakao",
    setup() {
        return {
            loginWithKakao,
        };
    },
};
</script>

<style scoped>
.kakao_btn {
    cursor: pointer;
}
</style>