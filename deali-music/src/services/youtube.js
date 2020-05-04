import axios from 'axios';
import youtubeKey from "../../youtubeConfig";

export function getYoutubeData(searchText) {
    const params = {
        key: youtubeKey,
        part: "snippet",
        q: searchText,
        maxResults: 9
    };
    return axios.get('https://www.googleapis.com/youtube/v3/search', {params});
}

export function getYoutubeDetail(youtubeId) {
    const params = {
        key: youtubeKey,
        part: "contentDetails",
        id: youtubeId,
    };
    return axios.get('https://www.googleapis.com/youtube/v3/videos', { params });
}