import axios from 'axios';
import VueCookies from 'vue-cookies';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['token'] = VueCookies.get('token');

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('axios 시작', config);
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
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('에러일 경우');
    return Promise.reject(error);
  });


export default axios;
