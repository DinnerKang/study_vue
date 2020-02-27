import * as firebase from 'firebase/app';
import 'firebase/database';
// import Store from '@/store';


// READ

export function getGroupList(name) {
    return firebase.database().ref(`group/all/${name}`);
}
export function getGroupListByKey(data) {
    return firebase.database().ref(`group/all/${data.dealiName}`);
}

export function getOpenGroup() {
    return firebase.database().ref('group/showGroup');
}

// WRITE

export function addMyGroup(data) {
    // if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    const ref = firebase.database().ref(`group/all/${data.dealiName}`);
    const myKey = ref.push().key;

    ref.child(myKey).set({
        groupName : data.groupName,
        description: data.description,
        myKey: myKey,
    });
    return myKey;
}

export function addLikeGroup(data) {
    return firebase.database().ref(`group/showGroup/${data.myKey}/likes`).update({
        [data.dealiName] : true,
    });
}


// UPDATE

export function addShowGroup(data) {
    const ref = firebase.database().ref('group/showGroup/');
    const myKey = ref.push().key;

    return ref.child(myKey).set({
        myKey: myKey,
        targetKey: data.targetKey,
        dealiName: data.dealiName,
        groupName: data.groupName,
    });
}

export function editMyGroupName(data) {
    const key = data.key + '/groupName';
    firebase.database().ref(`group/all/${data.userId}`).update({
        [key] : data.groupName
    });
}