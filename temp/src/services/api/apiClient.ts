import {BASE_URL} from '../../config/constants';
import axios from 'axios';

export const get = async (url: String) => {
    const res = await axios({
        method: 'get',
        url: BASE_URL + url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (__DEV__) {
        console.log("\x1B[32mApi:\x1B[0m", res.config.url);
        console.log("\x1B[32mRes:\x1B[0m", res.data);
    }
    return res;
};
export const post = async (url: string, dataPost: FormData) => {
    const res = await axios({
        method: 'post',
        url: BASE_URL + url,
        data: dataPost,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    });
    if (__DEV__) {
        console.log("\x1B[32mApi:\x1B[0m", res.config.url);
        console.log("\x1B[32mRes:\x1B[0m", JSON.stringify(res.data));
        console.log("\x1B[32mPost:\x1B[0m", dataPost);
    }
    return res;
};


