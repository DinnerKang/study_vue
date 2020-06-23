const state = {
    userName: '',
    userEmail: '',
    dealiName: '',
    userState: '',
};

const mutations = {
    loginUser(state, payload) {
        state.userName = payload.user.displayName;
        state.userEmail = payload.user.email;
        state.userState = payload.user.email.split('@')[1] === 'deali.net' ? '딜리언즈' : '게스트';
        state.dealiName = payload.user.email.split('@')[1] === 'deali.net'
            ? payload.user.email.split('@')[0]
            : payload.user.email.split('.').join('').split('@')[0] + '_' + payload.user.email.split('.').join('').split('@')[1].split('.')[0];
    },
    logoutUser(state) {
        state.userEmail = '';
        state.userName = '';
        state.dealiName = '';
        state.userState = '';
    },
};

const getters = {
    getUserStatus (state) {
        return state;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
