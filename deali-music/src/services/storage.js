
import * as firebase from 'firebase/app';
import 'firebase/storage';

export async function getThumbnail(dealiName) {
    const { items } = await firebase.storage().ref(`thumbnail/${dealiName}`).listAll();
    let thumbnaills = [];
    items.map((i) => {
        const { fullPath } = i;
        thumbnaills.push({
            url: firebase.storage().ref(fullPath).getDownloadURL(),
            fullPath,
        });
    })
    return thumbnaills;
}

export function uploadFile(dealiName, file) {
    console.log(file);
    const ref = firebase.storage().ref(`thumbnail/${dealiName}/${file.name}`);
    return ref.put(file);
}
export function deleteFile(fullPath) {
    return firebase.storage().ref(fullPath).delete();
}