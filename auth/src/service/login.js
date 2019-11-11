import axios from './axios';
import VueCookies from 'vue-cookies';

export async function testLogin(){
    
    try{
        const token = await axios.post('/testLogin');
        makeHeader(token);
        console.log('token', token);
        return token;
    }catch(err){
        return err;
    }
}

export async function refreshToken(){
    try{
        const token = await axios.post('/testRefreshToken');
        makeHeader(token);
        return token;
    }catch(err){
        return err;
    }
}

function makeHeader(token){
    VueCookies.set('token', token.data.data.token, '60s' );
    axios.defaults.headers['token'] = VueCookies.get('token');

    if(token.data.data.refresh_token){
        VueCookies.set('refresh_token', token.data.data.refresh_token, '1d');
        axios.defaults.headers['refresh_token'] = VueCookies.get('refresh_token');
    }
}