import axios from 'axios';

export function googleOAuth() {
    const params = {
        client_id: '945431733283-neonk0i8s0t41dfmf5ea4ckmoh5v2jj0.apps.googleusercontent.com',
        redirect_uri: 'https://vue-pwa-776e7.firebaseapp.com/login',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/youtube',
    };
    return axios.get(`https://accounts.google.com/o/oauth2/v2/auth`, {params});
}
