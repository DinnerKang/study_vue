import axios from 'axios';
import VueCookies from 'vue-cookies';
import { refreshToken } from './login';

axios.defaults.baseURL = 'http://localhost:5000';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['access-token'] = VueCookies.get('access-token');
    config.headers['refresh-token'] = VueCookies.get('refresh-token');
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('오류:', error.config);
    const errorAPI = error.config;
    if(error.response.status  === 401 && errorAPI.retry === undefined){
      errorAPI.retry = true;
      console.log('토큰이 이상한 오류일 경우');
      await refreshToken();
      return await axios(errorAPI);
    }
    return Promise.reject(error.response);
  });

  export default axios;