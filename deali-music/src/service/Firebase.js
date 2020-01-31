import * as firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';

export function videoController(status) {
    firebase.database().ref(`control/lounge`).set({
        status,
        date: String(new Date()),
    });

    firebase.database().ref('control/log').push({
        status,
        name: Store.state.userName,
    });
}
