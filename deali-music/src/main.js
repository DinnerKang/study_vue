import Vue from 'vue'
import VueMeta from 'vue-meta';
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters';
import VueCookies from 'vue-cookies';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
Vue.use(VueMeta);
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueCookies);

// 필터 등록
Object.entries(filters).map((item) => {
  Vue.filter(item[0], item[1]);
  return item;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
