
import * as firebase from 'firebase/app';
import 'firebase/storage';

const state = {
    0: '',
    1: '',
    2: '',
    imageArray: [],
    list: [
        '2.jpg',
        '3.jpg',
        'images.jpeg',
    ],
};

const mutations = {
    addImages(state, payload) {
        state.imageArray[payload.idx] = payload.url;
        return state[payload.idx] = payload.url;
    },
};

const getters = {
    getImages(state) {
        return (idx) => {
            return state[idx];
        }
    },
    getAllImages(state) {
        return state.imageArray;
    }
};

const actions = {
    async getAllThumbnails(state) {
        for (let idx = 0; idx <state.state.list.length; idx+=1) {
            const url = await firebase.storage().ref(`thumbnail/${state.state.list[idx]}`).getDownloadURL();
            const result = {
                idx,
                url,
            }
            state.commit('addImages', result);
        }        
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
