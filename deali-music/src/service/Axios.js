import axios from 'axios';
// import Store from '../store';

axios.defaults.baseURL = 'https://vue-pwa-776e7.firebaseapp.com';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // if (Store.state.login.userState !== '딜리언즈') return Promise.reject(alert('딜리언즈만 이용하실 수 있습니다.'));
    // Do something before request is sent
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
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
});

export default axios;
