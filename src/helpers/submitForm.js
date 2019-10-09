import axios from "axios";

export const submitForm = async (data, url, onSuccess, onError) => {
    try {
        const response = await axios.get(url);
        console.log(response.status)
        if (response.status >= 200 && response.status < 300) {
            console.log('onSuccess')
            onSuccess(response.data)
        } else {
            console.log('onError')
            onError(response.status)
        }
    } catch (e) {
        onError(e);
        throw new Error(e)
    }
};