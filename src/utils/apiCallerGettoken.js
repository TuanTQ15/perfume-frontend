import axios from "axios";
import qs from 'qs'

export default function callApiForPaypalGetToken(endpoint, method = 'POST',body, token = null) {
    return axios.request({
        url: endpoint,
        method: method,
        baseURL: "https://api-m.sandbox.paypal.com/",
        auth: {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_SECRET
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: qs.stringify({
            "grant_type": "client_credentials"
        })
    }).catch(err => console.log(err));
}