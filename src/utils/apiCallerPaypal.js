import axios from "axios";

export default function callApiForPaypal(endpoint, method = 'GET', body, token = null) {
    return axios({
        method,
        url: `https://api-m.sandbox.paypal.com/${endpoint}`,
        data: body,
        headers: {
            Authorization: token,
            Accept: "application/json"
        }
    }).catch(err => {
        console.log(err);
    });

    
}