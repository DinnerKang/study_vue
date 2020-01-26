import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    googleId: '',
    userName: '',
    userEmail: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.googleId = payload.credential.localId;
      state.userName = payload.user.displayName;
      state.userEmail = payload.user.email;
    },
    clearUser(state) {
      state.googleId = '';
      state.userEmail = '';
      state.userName = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
