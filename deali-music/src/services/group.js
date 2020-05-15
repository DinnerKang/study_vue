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
    return firebase.database().ref('group/showGroup').orderByChild('likes/count');
}
export function getOpenGroupByKey(key) {
    return firebase.database().ref(`group/showGroup/${key}`);
}

export function getLikeGroupList(data) {
    return firebase.database().ref(`group/likes/${data.dealiName}`);
}

export function getLikeGroupByKey(key) {
    return firebase.database().ref(`group/showGroup/${key}/likes`);
}


function countLikes(key) {
    getLikeGroupByKey(key).once('value', snapshot => {
        if (!snapshot.val()) return;
        const count = Object.keys(snapshot.val()).length -1;
        firebase.database().ref(`group/showGroup/${key}/likes`).update({
            count, 
        });
    })
}

// WRITE

export function addMyGroup(data) {
    const ref = firebase.database().ref(`group/all/${data.dealiName}`);
    const myKey = ref.push().key;

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
        thumbnailUrl: data.thumbnailUrl,
        myKey: myKey,
        isShowGroup: data.isShowGroup,
    });
}

export function addLikeGroup(data) {
    firebase.database().ref(`group/likes/${data.dealiName}`).update({
        [data.targetKey] :  data.targetName,
    }); 
    if (data.isShowGroup === false) return;

    firebase.database().ref(`group/showGroup/${data.targetKey}/likes`).update({
        [data.dealiName] : true,
    });
    return countLikes(data.targetKey);
}



// UPDATE

export function addShowGroup(data) {
    const ref = firebase.database().ref('group/showGroup');

    return ref.child(data.targetKey).set({
        targetKey: data.targetKey,
        dealiName: data.dealiName,
        groupName: data.groupName,
        likes: {
            count: 0
        },
    });
}

export function editMyGroup(data) {
    firebase.database().ref(`group/all/${data.dealiName}/${data.targetKey}`).update({
        groupName: data.groupName,
        description: data.description,
        isShowGroup: data.isShowGroup,
        thumbnailUrl: data.thumbnailUrl,
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
    firebase.database().ref(`group/showGroup/${data.targetKey}/likes/${data.dealiName}`).remove();
    return countLikes(data.targetKey);
}

export function deleteOpenGroup(data) {
    return firebase.database().ref(`group/showGroup/${data.targetKey}`).remove();
}

export function deleteMyGroup(data) {
    firebase.database().ref(`group/all/${data.dealiName}/${data.targetKey}`).remove();
    firebase.database().ref(`group/showGroup/${data.targetKey}`).remove();
    firebase.database().ref(`music/${data.dealiName}/${data.targetKey}`).remove();
    firebase.database().ref(`group/likes/${data.dealiName}/${data.targetKey}`).remove();
}

