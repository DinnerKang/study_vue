<template>
    <div id="naverIdLogin"></div>
</template>

<script>
// import { naverLogin } from '@/services/login/login';

export default {
    mounted() {
        this.setNaver();
    },
    methods:{
        setNaver() {
            const naverLogin = new window.naver.LoginWithNaverId(
                {
                    clientId: "a0K6ybsWcgRtXZiQlXfk",
                    callbackUrl: "http://localhost:8080/auth",
                    isPopup: false, /* 팝업을 통한 연동처리 여부 */
                    loginButton: {color: "green", type: 3, height: 60} /* 로그인 버튼의 타입을 지정 */
                }
            );
            naverLogin.init();
        }
    }
}
</script>

<style scoped>

</style>