<template>
    <div>
        test
    </div>
</template>

<script>
import { getKakaoToken, getKakaoUserInfo, naverService } from "@/services/login/login";
export default {
    name: 'Auth',
    created() {
        if (this.$route.query.code) {
            this.setKakaoToken();
        }
        if (this.$route.hash) {
            console.log(this.$route.hash);
            const token = this.$route.hash.split('&')[0].substr(14);
            naverService().getUserInfo(token);
        }
    },
    methods: {
        async setKakaoToken () {
            console.log('카카오 인증 코드', this.$route.query.code);
            const { data } = await getKakaoToken(this.$route.query.code);
            if (data.error) {
                alert('카카오톡 로그인 오류입니다.');
                this.$router.replace('/login');
                return;
            }
            window.Kakao.Auth.setAccessToken(data.access_token);
            this.$cookies.set('access-token', data.access_token, '1d');
            this.$cookies.set('refresh-token', data.refresh_token, '1d');
            await this.setUserInfo();
            this.$router.replace('/');
        },
        async setUserInfo () {
            const res = await getKakaoUserInfo();
            const userInfo = {
                name: res.kakao_account.profile.nickname,
                platform: 'kakao',
            };
            this.$store.commit('setUser', userInfo);
        },
    }
}
</script>