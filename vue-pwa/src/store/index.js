import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
  },
  mutations: {
    setName(state, payload) {
      state.userName = payload;
    },
    setEmail(state, payload) {
      state.userEmail = payload;
    },
    clearUser(state) {
      state.userEmail = '';
      state.userName = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
