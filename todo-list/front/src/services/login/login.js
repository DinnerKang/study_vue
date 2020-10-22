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
        var esc = encodeURIComponent;
        var query = Object.keys(data)
            .map(k => esc(k) + '=' + esc(data[k]))
            .join('&');
            console.log(query);
        const result = await axios.post('https://kauth.kakao.com/oauth/token', query, { headers: kakaoHeader });
        return result;
    } catch (e) {
        return e;
    }
};
export {
    getKakaoToken,
};