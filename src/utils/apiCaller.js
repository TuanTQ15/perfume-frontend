import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi(endpoint, method = 'GET', body, token = null) {
    return axios({
        method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers : {
            Authorization: token
        }
    }).catch(err => {
        console.log(err);
    });
}