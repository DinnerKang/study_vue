import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';


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