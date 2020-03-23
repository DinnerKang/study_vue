
const state = {
    groupThumbnails: [],
};

const mutations = {
    setGroupThumbnails(state, payload) {
        return state.groupThumbnails[payload.index] = payload.img;
    },
};


const getters = {
    getGroupThumbnails(state){
        return state.groupThumbnails;
    },
    getThumbnailByIdx(state){
        return (payload) => {
            return state.groupThumbnails[payload];
        };
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
