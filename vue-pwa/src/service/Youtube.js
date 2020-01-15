import axios from 'axios';
import key from '../../youtubeConfig';

const part = 'snippet';

export function searchYoutube(q, maxResults) {
    const params = {
        key,
        part,
        q,
        maxResults,
    };
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}

export function getPlayList() {
    const params = {
        key,
        part,
        mine: true,
    };
    return axios.get(`https://www.googleapis.com/youtube/v3/playlists`, {params});
}
export function addPlayList(name) {
    const params = {
        part,
        resource: {
            snippet: {
              title: `Dealicious_${name}`,
              description: `Dealicious ${name}`,
            },
          }
    };
    return axios.post(`https://www.googleapis.com/youtube/v3/playlists`, {params});
}

export function addPlayItem() {
    const params = {
        key,
        part,
    };
    return axios.post(`https://www.googleapis.com/youtube/v3/playlists`, {params});
}