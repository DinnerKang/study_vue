<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <div>
                <input type="text" v-model="email" />
            </div>
            <div>
                <input type="text" v-model="password" />
            </div>
            <div>
                <button type="button" @click="loginWithEmail(email, password)">이메일로 로그인</button>
            </div>
            <div>
                <button type="button" @click="$router.push('/signUp')">회원가입</button>
            </div>
        </div>
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
import { ref } from "@vue/composition-api";
import { emailService } from '@/services/login';
import LoginKakao from "./LoginKakao";
import LoginFirebase from "./LoginFirebase";
import LoginGoogle from "./LoginGoogle";
import LoginNaver from "./LoginNaver";

export default {
    name: "TheLogin",
    components: {
        LoginKakao,
        LoginFirebase,
        LoginGoogle,
        LoginNaver,
    },
    setup() {
        const email = ref("");
        const password = ref("");
        const loginWithEmail = async (email, password) => {
            await emailService().emailLogin(email, password);
        }
        return {
            email,
            password,
            loginWithEmail,
        };
    },
};
</script>

<style>
</style>