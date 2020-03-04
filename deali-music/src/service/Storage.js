
import * as firebase from 'firebase/app';
import 'firebase/storage';

export function readFolderLists() {
    return firebase.storage().ref('thumbnail').listAll();
}

export function getThumbnail(fullPath) {
    return firebase.storage().ref(`${fullPath}`).getDownloadURL();
}

export function uploadThumbnail(data) {
    const nowDate = getDate();
    return firebase.storage().ref('thumbnail').child(`${nowDate}-${data.dealiName}`).put(data.file);
}

function getDate() {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth();
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${YYYY}${MM}${DD}${hh}${mm}`;
}