import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
    token: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.userName = payload.displayName;
      state.userEmail = payload.email;
      state.token = payload.oauthAccessToken;
    },
    clearUser(state) {
      state.userEmail = '';
      state.userName = '';
      state.token = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
