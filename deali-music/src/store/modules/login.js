const state = {
    userName: '',
    userEmail: '',
    dealiName: '',
    userState: '',
    isDJ: false,
};

const mutations = {
    loginUser(state, payload) {
        state.userName = payload.user.displayName;
        state.userEmail = payload.user.email;
        state.dealiName = payload.user.email.split('@')[0];
        state.userState = payload.user.email.split('@')[1] === 'deali.net' ? '딜리언즈' : '게스트';

        const DJList = [
            'jenhyuk@deali.net',
        ];
        if (DJList.includes(state.userEmail)) state.isDJ = true;
    },
    logoutUser(state) {
        state.userEmail = '';
        state.userName = '';
        state.dealiName = '';
        state.userState = '';
        state.isDJ = false;
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
