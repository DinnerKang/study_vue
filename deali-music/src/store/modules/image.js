import { readFolderLists, getThumbnail } from '@/service/Storage';

const state = {
    groupThumbnails: [],
};

const mutations = {
    setGroupThumbnails(state, payload) {
        return state.groupThumbnails[payload.index] = payload.img;
    },
};

const actions = {
    async getGroupThumbnails(state) {
        if (state.getters['getGroupThumbnails'].length > 0) return;
        const { items } = await readFolderLists();
        const fullPath = items.map(i => i.fullPath);

        for (let i = 0; i < fullPath.length; i += 1) {
            const img = await getThumbnail(fullPath[i]);
            const data = {
                img,
                index: i,
            };
            state.commit('setGroupThumbnails', data);
        }
    },
};


const getters = {
    getGroupThumbnails(state){
        return state.groupThumbnails;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
