import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
