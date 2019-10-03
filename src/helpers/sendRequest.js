import * as axios from "axios";

export const sendRequest = (data, method, url, fn, fnError) => {
    let header;
    axios({
        method: method,
        url: url,
        data: data,
        headers: header
    })
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                fn(result.data)
            }
        })
        .catch(e => {
                    fnError(e.message);
                    throw new Error(e)
                })
};