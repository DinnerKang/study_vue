
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

export async function uploadFile(dealiName, file) {
    await firebase.storage().ref(`thumbnail/${dealiName}/${file.name}`).put(file);
}
export function deleteFile(fullPath) {
    return firebase.storage().ref(fullPath).delete();
}