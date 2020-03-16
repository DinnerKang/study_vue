
import * as firebase from 'firebase/app';
import 'firebase/storage';

export function readFolderLists() {
    return firebase.storage().ref('thumbnail').listAll();
}

export function getThumbnail(fullPath) {
    const url = firebase.storage().ref(`${fullPath}`).getDownloadURL();
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest()
        xhr.onload = () => {
          let reader = new FileReader()
          reader.onloadend = function () {
            resolve(reader.result)
          }
          reader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
    });
}
