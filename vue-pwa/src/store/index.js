import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.userName = payload.displayName;
      state.userEmail = payload.email;
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
