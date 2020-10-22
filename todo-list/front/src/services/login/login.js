import axios from '@/services/axios/axios';

const kakaoHeader = {
    'Authorization': '86cd328810189ad3e09170078d1f1ea4',
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};
const getKakaoToken = async (code) => {
    console.log('loginWithKakao');
    try {
        const data = {
            grant_type: 'authorization_code',
            client_id: '7fb3e6fe9cbaebc845fba947299ddd23',
            redirect_uri: 'http://localhost:8080/auth',
            code: code,
        };
        const queryString = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');
        const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader });
        console.log('카카오 토큰', queryString);
        return result;
    } catch (e) {
        return e;
    }
};
const getKakaoUserInfo = async () => {
    let data = '';
    await window.Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
            data = response;
        },
        fail: function (error) {
            console.log(error);
        },
    });
    console.log('카카오 계정 정보', data);
    return data;
}
export {
    getKakaoToken,
    getKakaoUserInfo,
};