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
            window.Kakao.Auth.setAccessToken(data.access_token);
        },
    }
}
</script>