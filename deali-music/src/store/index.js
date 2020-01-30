import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userEmail: '',
    dealiName: '',
    userState: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.userName = payload.user.displayName;
      state.userEmail = payload.user.email;
      state.dealiName = payload.user.email.split('@')[0];
      state.userState = payload.user.email.split('@')[1] === 'deali.net' ? '딜리언즈' : '게스트';
    },
    clearUser(state) {
      state.userEmail = '';
      state.userName = '';
      state.dealiName = '';
      state.userState = '';
    },
  },
  actions: {
  },
  modules: {
  }
})
