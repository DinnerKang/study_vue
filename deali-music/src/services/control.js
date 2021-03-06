import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';


// Read

export function getControlLoungeStatus() {
    return firebase.database().ref('control/lounge');
}

// Write

export function videoController(status) {
    firebase.database().ref(`control/lounge`).update({
        status,
        date: String(new Date()),
    });

    firebase.database().ref('control/log').push({
        status,
        name: Store.state.login.userName,
    });
}

export function soundControl(volume) {
    if (volume === null) return;

    firebase.database().ref('control/log/volume').push({
        name: Store.state.login.userName,
    });

    return firebase.database().ref('control/lounge').update({
        volume: Number(volume),
        date: String(new Date()),
    });
}

export function musicControl(idx) {
    firebase.database().ref('control/log').push({
        idx: idx,
        name: Store.state.login.userName,
    });
    return firebase.database().ref(`control/lounge`).update({
        idx: idx,
    });
}