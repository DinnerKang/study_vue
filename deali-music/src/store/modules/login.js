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
        state.dealiName = payload.user.email.split('@')[0];
        state.userState = payload.user.email.split('@')[1] === 'deali.net' ? '딜리언즈' : '게스트';
    },
    logoutUser(state) {
        state.userEmail = '';
        state.userName = '';
        state.dealiName = '';
        state.userState = '';
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
