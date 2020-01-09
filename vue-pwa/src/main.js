import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import GoogleAuth from 'vue-google-auth'

Vue.use(GoogleAuth, { clientID: '945431733283-a4tf33jpvkabm0c1d56rqj96lu4i8iet.apps.googleusercontent.com' })
Vue.googleAuth().load()

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
