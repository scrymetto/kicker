import {prepareDataForRequest} from "./prepareDataForRequest";
import * as axios from "axios";
import {newUserAnswer} from "./mocks/newUserMock";

export const submitForm = (values, template, method, url, fn, fnError) => {
    let data = prepareDataForRequest(template, values);
    let header;
    // axios({
    //     method: method,
    //     url: url,
    //     data: data,
    //     // headers: headers
    // })
    newUserAnswer()
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                console.log(result.data)
                fn(result.data)
            }
        })
        .catch(e => {
            fnError(e.message);
            throw new Error(e)
        })
};