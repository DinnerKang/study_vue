const state = {
    isFooter: false,
};

const mutations = {
    disableFooter(state) {
        state.isFooter = false;
    },
    ableFooter(state) {
        state.isFooter = true;
    }
};

const getters = {
    getFooter (state) {
        return state.isFooter;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
