import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';


// READ

export function getGroupList(name) {
    return firebase.database().ref(`group/${name}`);
}

export function getGroup() {
    return firebase.database().ref('group');
}


// WRITE

export function addMyGroup(data) {
    if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');

    firebase.database().ref(`group/${data.userId}`).push({
        groupName : data.groupName,
    });
}


// UPDATE

export function addAlbum(data) {
    const key = data.key + '/isShow';
    firebase.database().ref(`group/${data.userId}`).update({
        [key] : data.isShow,
    });
}

export function editMyGroupName(data) {
    const key = data.key + '/groupName';
    firebase.database().ref(`group/${data.userId}`).update({
        [key] : data.groupName
    });
}