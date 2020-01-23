import axios from 'axios';
import key from '../../youtubeConfig';

const part = 'snippet';

export function searchYoutube(params) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}
