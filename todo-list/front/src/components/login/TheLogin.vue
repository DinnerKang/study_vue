<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <login-kakao></login-kakao>
        </div>
        <div>
            <login-firebase></login-firebase>
        </div>
        <div>
            <login-google></login-google>
        </div>
    </article>
</template>

<script>
import LoginKakao from "./LoginKakao";
import LoginFirebase from './LoginFirebase';
import LoginGoogle from './LoginGoogle';

export default {
    name: "TheLogin",
    components: {
        LoginKakao,
        LoginFirebase,
        LoginGoogle,
    },
};
</script>

<style>
</style>