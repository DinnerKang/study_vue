
import * as firebase from 'firebase/app';
import 'firebase/storage';

const list = [
    '2.jpg',
    '3.jpg',
    'images.jpeg',
];


export async function getThumbnail(dealiName) {
    const { items } = await firebase.storage().ref(`thumbnail/${dealiName}`).listAll();
    let thumbnaills = [];
    items.map((i) => {
        const { fullPath } = i;
        thumbnaills.push(firebase.storage().ref(fullPath).getDownloadURL());
    })
    return thumbnaills;
}

export function getAllThumbnails(){
    return list.map((item, idx) => firebase.storage().ref(`thumbnail/${list[idx]}`).getDownloadURL());
} 