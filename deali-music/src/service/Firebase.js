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
        playTime: data.playTime,
        videoName: data.videoName,
    });
}

export function registMusic(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');

    firebase.database().ref(`music/${data.userId}/${data.groupName}`).push({
        musicName: data.musicName,
        videoId: data.videoId,
        registDate: data.registDate,
        userName: data.userName,
    });
    return alert('저장했습니다.');
}

export function addMyGroup(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');

    firebase.database().ref(`group/${data.userId}`).push({
        groupName : data.groupName,
    });
}

export function editMyGroupName(data) {
    const key = data.key + '/groupName';
    firebase.database().ref(`group/${data.userId}`).update({
        [key] : data.groupName
    });
}

export function addAlbum(data) {
    const key = data.key + '/isDJ';
    firebase.database().ref(`group/${data.userId}`).update({
        [key] : data.isDJ,
    })
}
