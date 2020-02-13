import * as firebase from 'firebase/app';
import 'firebase/database';


// Read

export function getLoungeStatus() {
    return firebase.database().ref('status/lounge');
}

// Write

export function addVideoStatus(data) {
    firebase.database().ref('status/lounge').set({
        status: data.status,
        playTime: data.playTime,
        videoName: data.videoName,
    });
}