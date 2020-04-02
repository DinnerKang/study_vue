import * as firebase from 'firebase/app';
import 'firebase/database';
// import Store from '@/store';


// Read

export function getMusicListByGroup(data) {
    return firebase.database().ref(`music/${data.dealiName}/${data.groupKey}`);
}


// Write

export function registMusic(data) {
    // if (Store.state.login.userState !== '딜리언즈') return alert('딜리언즈만 사용 가능합니다.');
    firebase.database().ref(`music/${data.dealiName}/${data.groupKey}`).push({
        thumbnails: data.thumbnails,
        musicName: data.musicName,
        videoId: data.videoId,
        registDate: data.registDate,
        dealiName: data.dealiName,
    });
    return alert('저장했습니다.');
}

// Delete

export function deleteMusic(data, key) {
    firebase.database().ref(`music/${data.id}`).child(key).remove();
}