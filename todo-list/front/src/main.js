import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies';
import VueCompositionApi from '@vue/composition-api';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueCookies);
window.Kakao.init('11389a646ff3ee08666e284887809809');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
