<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <login-kakao></login-kakao>
        </div>
        <button type="button" @click="test">테스트</button>
    </article>
</template>

<script>
import LoginKakao from "./LoginKakao";
export default {
    name: "TheLogin",
    components: {
        LoginKakao,
    },
    methods: {
        test() {
            console.log("test");
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: function (response) {
                    console.log(response);
                },
                fail: function (error) {
                    console.log(error);
                },
            });
        },
    },
};
</script>

<style>
</style>