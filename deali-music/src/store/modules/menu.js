const state = {
    isFooter: true,
};

const mutations = {
    disableFooter(state) {
        state.isFooter = false;
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
