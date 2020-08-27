import Vue from "vue";
import compositionAPI from '@vue/composition-api';
import VueObserveVisibility from 'vue-observe-visibility';
import App from "./App.vue";

Vue.use(compositionAPI);
 
Vue.use(VueObserveVisibility)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
