import axios from './axios';
import VueCookies from 'vue-cookies';

export async function onLogin(){
    
    try{
        const token = await axios.post('/testLogin');
        makeHeader(token);
        return token;
    }catch(err){
        return err;
    }
}

export async function refreshToken(){
    try{
        const token = await axios.post('/testRefreshToken');
        makeHeader(token);
        return 
    }catch(err){
        return err;
    }
}


function makeHeader(token){
    VueCookies.set('token', token.data.data.token, '60s' );
    
    if(token.data.data.refresh_token){
        VueCookies.set('refresh_token', token.data.data.refresh_token, '1d');
    }
}