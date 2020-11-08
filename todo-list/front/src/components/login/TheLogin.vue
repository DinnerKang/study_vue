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
        <div>
            <login-naver></login-naver>
        </div>
    </article>
</template>

<script>
import LoginKakao from "./LoginKakao";
import LoginFirebase from './LoginFirebase';
import LoginGoogle from './LoginGoogle';
import LoginNaver from './LoginNaver';

export default {
    name: "TheLogin",
    components: {
        LoginKakao,
        LoginFirebase,
        LoginGoogle,
        LoginNaver,
    },
};
</script>

<style>
</style>