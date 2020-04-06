import * as firebase from 'firebase/app';
import 'firebase/database';
import { getYoutubeDetail } from './Youtube';
// import Store from '@/store';


// Read

export function getMusicListByGroup(data) {
    return firebase.database().ref(`music/${data.dealiName}/${data.groupKey}`);
}


// Write

export async function registMusic(searchResult) {
    const { data } = await getYoutubeDetail(searchResult.videoId);
    
    await firebase.database().ref(`music/${searchResult.dealiName}/${searchResult.groupKey}`).push({
        thumbnails: searchResult.thumbnails,
        musicName: searchResult.musicName,
        videoId: searchResult.videoId,
        dealiName: searchResult.dealiName,
        duration: data.items[0].contentDetails.duration,
    });
    return alert('저장했습니다.');
}

// Delete

export function deleteMusic(data, key) {
    firebase.database().ref(`music/${data.dealiName}/${data.groupKey}`).child(key).remove();
}