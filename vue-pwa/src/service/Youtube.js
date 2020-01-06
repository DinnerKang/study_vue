import axios from 'axios';

export function searchYotube(params) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}