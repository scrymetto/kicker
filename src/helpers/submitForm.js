import {prepareDataForRequest} from "./prepareDataForRequest";
import {sendRequest} from "./sendRequest";
// import {fakeRequest} from "../../__mocks__/fakeRequestForSubmitForm";

export const submitForm = (values, template, method, url, fn, fnError) => {
    let data = prepareDataForRequest(template, values);
    let header;
    sendRequest(data, method, url, fn, fnError)

    // for testing in browser:
    // fakeRequest()
    //     .then(result => {
    //         if (result.status >= 200 && result.status < 300) {
    //             fn(result.data)
    //         }
    //     })
    //     .catch(e => {
    //         fnError(e.message);
    //         throw new Error(e)
    //     })
};