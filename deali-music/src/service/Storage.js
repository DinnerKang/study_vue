
import * as firebase from 'firebase/app';
import 'firebase/storage';

const list = [
    '2.jpg',
    '3.jpg',
    'images.jpeg',
];


export function getThumbnail(idx) {
    return firebase.storage().ref(`thumbnail/${list[idx]}`).getDownloadURL();
}

export function getAllThumbnails(){
    return list.map((item, idx) => firebase.storage().ref(`thumbnail/${list[idx]}`).getDownloadURL());
} 
