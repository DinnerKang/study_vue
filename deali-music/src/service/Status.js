import * as firebase from 'firebase/app';
import 'firebase/database';

export function addVideoStatus(data) {
    firebase.database().ref('status/lounge').set({
        status: data.status,
        playTime: data.playTime,
        videoName: data.videoName,
    });
}