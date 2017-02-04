import axios from 'axios';
import getPath from 'lodash/get';
import {token} from './api';

const request = options => {
    options = Object.assign({}, options, {
        headers: Object.assign({}, options.headers, {
            'Authorization': `Basic ${token}`
        })
    });

    return axios(options).then(response => getPath(response, 'data'));
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
