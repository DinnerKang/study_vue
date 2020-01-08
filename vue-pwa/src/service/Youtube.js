import axios from 'axios';
import key from '../../youtubeConfig';
import token from '../store';


export function searchYoutube(q, maxResults) {
    const params = {
        key,
        part: 'snippet',
        q,
        maxResults,
    };
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}

export function getPlayList() {
    const params = {
        key,
        part: 'snippet',
        mine: true,
        access_token: token.state.accessToken,
    };
    return axios.get('https://www.googleapis.com/youtube/v3/playlists', {params});
}

export function addPlayList() {
    const data = {
        key,
        part: 'snippet',
        resource: {
            snippet: {
              title: 'Test Playlist',
            },
        }
    }
    return axios.post('https://www.googleapis.com/youtube/v3/playlists', {data});
}