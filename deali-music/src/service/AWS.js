import axios from './Axios';

export function getMelonChart(status) {
    return axios.get(`https://caj4kxiq81.execute-api.ap-northeast-2.amazonaws.com/dev/hello/${status}`);
}