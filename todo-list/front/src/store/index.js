import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    kakaoCode: '',
  },
  mutations: {
    setKakaoCode(state, payload) {
      state.kakaoCode = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
