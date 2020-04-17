import * as firebase from 'firebase/app';
import 'firebase/database';
// import Store from '@/store';

// READ

export function getGroupList(dealiName) {
    return firebase.database().ref(`group/all/${dealiName}`);
}

export function getGroupListByKey(data) {
    return firebase.database().ref(`group/all/${data.dealiName}/${data.key}`);
}

export function getOpenGroup() {
    return firebase.database().ref('group/showGroup');
}

export function getLikeGroupList(data) {
    return firebase.database().ref(`group/likes/${data.dealiName}`);
}

export function getLikeGroupByKey(key) {
    return firebase.database().ref(`group/showGroup/${key}/likes`);
}


// WRITE

export function addMyGroup(data) {
    // if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    const ref = firebase.database().ref(`group/all/${data.dealiName}`);
    const myKey = ref.push().key;
    console.log(data);

    if (data.isShowGroup === true) {
        const data1 = {
            targetKey: myKey,
            dealiName: data.dealiName,
            groupName: data.groupName,
        };
        addShowGroup(data1);
    }
    return ref.child(myKey).set({
        groupName : data.groupName,
        description: data.description,
        thumbnailIdx: data.thumbnailIdx,
        myKey: myKey,
        isShowGroup: data.isShowGroup,
    });
}

export function addLikeGroup(data) {
    firebase.database().ref(`group/likes/${data.dealiName}`).update({
        [data.targetKey] :  data.targetName,
    });
    return firebase.database().ref(`group/showGroup/${data.targetKey}/likes`).update({
        [data.dealiName] : true,
    });
}



// UPDATE

export function addShowGroup(data) {
    const ref = firebase.database().ref('group/showGroup');

    return ref.child(data.targetKey).set({
        targetKey: data.targetKey,
        dealiName: data.dealiName,
        groupName: data.groupName,
    });
}

export function editMyGroup(data) {
    firebase.database().ref(`group/all/${data.dealiName}/${data.targetKey}`).update({
        groupName: data.groupName,
        description: data.description,
        isShowGroup: data.isShowGroup,
        thumbnailIdx: data.thumbnailIdx,
    });
    if (data.isShowGroup === true) {
        addShowGroup(data);
    } else {
        deleteOpenGroup(data);
    }
}

// Delete

export function deleteLikeGroup(data) {
    firebase.database().ref(`group/likes/${data.dealiName}/${data.targetKey}`).remove();
    return firebase.database().ref(`group/showGroup/${data.targetKey}/likes/${data.dealiName}`).remove();
}

export function deleteOpenGroup(data) {
    return firebase.database().ref(`group/showGroup/${data.targetKey}`).remove();
}

export function deleteMyGroup(data) {
    firebase.database().ref(`group/all/${data.dealiName}/${data.targetKey}`).remove();
    firebase.database().ref(`music/${data.dealiName}/${data.targetKey}`).remove();
    return deleteLikeGroup(data);
}