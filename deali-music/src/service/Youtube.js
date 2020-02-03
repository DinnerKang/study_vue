import axios from './Axios';

export function getYoutubeData(params) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params});
}