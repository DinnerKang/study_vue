
import * as firebase from 'firebase/app';
import 'firebase/storage';

export function readFolderLists() {
    return firebase.storage().ref('thumbnail').listAll();
}

export function getThumbnail(fullPath) {
    return firebase.storage().ref(`${fullPath}`).getDownloadURL();
}

export function uploadThumbnail(file) {
    return firebase.storage().ref('thumbnail').child(`${file.name}`).put(file);
}