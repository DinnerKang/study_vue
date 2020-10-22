<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <login-kakao></login-kakao>
        </div>
    </article>
</template>

<script>
import LoginKakao from "./LoginKakao";
export default {
    name: "TheLogin",
    components: {
        LoginKakao,
    },
};
</script>

<style>
</style>