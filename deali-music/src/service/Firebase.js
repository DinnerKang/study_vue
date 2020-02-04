import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';

export function videoController(status) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    firebase.database().ref(`control/lounge`).set({
        status,
        date: String(new Date()),
    });

    firebase.database().ref('control/log').push({
        status,
        name: Store.state.login.userName,
    });
}

export function updateMelon(data) {
    firebase.database().ref('melon').set({
        result : data.result,
        registDate : data.registDate,
    });
}

export function addVideoStatus(data) {
    firebase.database().ref('status/lounge').set({
        status: data.status,
        videoName: data.videoName,
    });
}