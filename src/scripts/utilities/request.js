import axios from 'axios';

const request = options => {
    return axios(options);
};

export const get = (url, options) => {
    options = Object.assign({}, options, {
        url: url,
        method: 'get'
    });

    return request(options);
};

export const post = (url, data, options) => {
    options = Object.assign({}, options, {
        url: url,
        method: 'post',
        data: data
    });

    return request(options);
};

export default {
    get,
    post
};
