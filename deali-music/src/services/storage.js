
import * as firebase from 'firebase/app';
import 'firebase/storage';

export async function getThumbnail(dealiName) {
    const { items } = await firebase.storage().ref(`thumbnail/${dealiName}`).listAll();
    let thumbnaills = [];
    items.map((i) => {
        const { fullPath } = i;
        thumbnaills.push(firebase.storage().ref(fullPath).getDownloadURL());
    })
    return thumbnaills;
}
/*
export function getAllThumbnails(){
    return list.map((item, idx) => firebase.storage().ref(`thumbnail/${list[idx]}`).getDownloadURL());
} 
*/

export function updateFile(dealiName, file) {
    console.log(dealiName, file);
    const ref = firebase.storage().ref(`thumbnail/${dealiName}/${file.name}`);
    ref.put(file).then(() => {
        console.log('성공')
        getThumbnail();
    });
}