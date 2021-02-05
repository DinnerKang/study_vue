<template>
    <article>
        <div>로그인 페이지</div>
        <div>
            <div>
                <input type="email" v-model="email" />
            </div>
            <div>
                <input type="text" v-model="password" />
            </div>
            <div>
                <button type="button" @click="loginWithEmail(email, password)">
                    이메일로 로그인
                </button>
            </div>
            <div>
                <button type="button" @click="$router.push('/signUp')">회원가입</button>
            </div>
            <button type="button" @click="testAPI">테스트 API</button>
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
import { emailService } from "@/services/login";
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
        };
        const testAPI = async () => {
            await emailService().test();
        }
        return {
            email,
            password,
            loginWithEmail,
            testAPI,
        };
    },
};
</script>

<style>
button {
    width: 120px;
    height: 30px;
    border: 1px solid rgb(26, 19, 19);
    border-radius: 25px;
    background-color: #fff;
    cursor: pointer;
    font-size: 13px;
    outline: none;
    margin: 10px 0;
}
</style>
