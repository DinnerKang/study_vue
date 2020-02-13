import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';


// Read

export function getLoungeStatus() {
    return firebase.database().ref('control/lounge');
}

// Write

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

