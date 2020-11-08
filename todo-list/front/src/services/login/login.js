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

const getGoogleToken = (googleUser) => {
    console.log('test');
    var profile = googleUser.getBasicProfile();
    console.log('ID Token: ', googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
const naverLogin = async () => {
    const test = await axios.get('https://nid.naver.com/oauth2.0/authorize');
    console.log(test);
};

export {
    getKakaoToken,
    getKakaoUserInfo,
    getGoogleToken,
    naverLogin,
};