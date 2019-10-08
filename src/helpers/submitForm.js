import {prepareDataForRequest} from "./prepareDataForRequest";
import axios from "axios";

export const submitForm = (values, template, url, onSuccess, onError) => {
    let data = prepareDataForRequest(template, values);
     axios.get(url)
        .then(result => {
            if (result.status >= 200 && result.status < 300 ) {
                onSuccess(result.data)
            } else {
                console.log(result)
                onError(result.status)
            }
        })
        .catch(e => {
            onError(e);
            throw new Error(e)
        });
};