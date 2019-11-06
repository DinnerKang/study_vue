import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './service/axios';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
