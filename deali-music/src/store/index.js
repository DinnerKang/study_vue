import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
    accessToken: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.userName = payload.user.displayName;
      state.userEmail = payload.user.email;
    },
    setToken(state, payload) {
      state.accessToken = payload;
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
