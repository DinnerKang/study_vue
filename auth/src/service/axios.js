import axios from 'axios';
import VueCookies from 'vue-cookies';
import { refreshToken } from '../service/login'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['token'] = VueCookies.get('token');
axios.defaults.headers['refresh_token'] = VueCookies.get('refresh_token');

let isRefresh = false;

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    console.log('axios 시작', config);
    console.log(VueCookies.get('token'));
    if(VueCookies.get('token') === null && VueCookies.get('refresh_token') !== null && isRefresh===false ){
      console.log('token 값이 날라감');
      isRefresh = true;
      const token = await refreshToken();
      config.defaults.headers['token'] = token.data.data.token;
      
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('axios 성공 후 response 전달');
    isRefresh = true;
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('에러일 경우');
    isRefresh = true;
    return Promise.reject(error);
  });


export default axios;
