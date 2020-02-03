import Vue from 'vue';
import Vuex from 'vuex';
import search from './modules/search';
import login from './modules/login';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    login,
  }
})
