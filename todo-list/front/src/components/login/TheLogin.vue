<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <login-kakao></login-kakao>
        </div>
        <div>
            <login-google></login-google>
        </div>
    </article>
</template>

<script>
import LoginKakao from "./LoginKakao";
import LoginGoogle from './LoginGoogle';

export default {
    name: "TheLogin",
    components: {
        LoginKakao,
        LoginGoogle,
    },
};
</script>

<style>
</style>