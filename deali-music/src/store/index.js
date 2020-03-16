import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import menu from './modules/menu';
import image from './modules/image';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    menu,
    image,
  }
})
