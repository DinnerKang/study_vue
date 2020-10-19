<template>
    <button type="button" @click="loginWithKakao">카카오 로그인</button>
</template>

<script>
import { getKakaoToken } from "@/services/login/login";

const loginWithKakao = () => {
    const params = {
        redirectUri: "http://localhost:8080/login",
    };
    window.Kakao.Auth.authorize(params);
};
export default {
    name: "LoginKakao",
    setup(props, { root }) {
        const setKakaoToken = async () => {
            const { data } = await getKakaoToken(root.$route.query.code);
            window.Kakao.Auth.setAccessToken(data.access_token);
            console.log(data);
        };

        if (root.$route.query.code) {
            // window.Kakao.Auth.setAccessToken(this.$route.query.code);
            console.log(root.$route.query.code);
            setKakaoToken();
        }

        
        return {
            loginWithKakao,
        };
    },
};
</script>

<style>
</style>