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


// POST
export function addPlayList(name) {
    const data = {
        snippet: {
            title: 'Deali_Music',
            description: `Dealicious ${name}`,
        },
    };
    return axios.post(`https://www.googleapis.com/youtube/v3/playlists?part=snippet`, data);
}
