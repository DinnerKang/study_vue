<template>
    <div>
        test
    </div>
</template>

<script>
import { getKakaoToken } from "@/services/login/login";
export default {
    name: 'Auth',
    created() {
        if (this.$route.query.code) {
            this.setKakaoToken();
        }
    },
    methods: {
        async setKakaoToken () {
            const { data } = await getKakaoToken(this.$route.query.code);
            console.log(data);
            if (data.error) {
                alert('카카오톡 로그인 오류입니다.');
                this.$router.replace('/login');
                return;
            }
            window.Kakao.Auth.setAccessToken(data.access_token);
            this.$router.replace('/');
        },
    }
}
</script>