import axios from 'axios';
import key from '../../youtubeConfig';

export function searchYoutube(q, maxResults) {
    const params = {
        key,
        part: 'snippet',
        q,
        maxResults,
    };
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}
