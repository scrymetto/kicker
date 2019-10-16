import axios from "axios";

export const submitNewUserForm = async (data, onSuccess, onError) => {
    let {email, password, login: nickname} = data;

    try {
        const response = await axios.post('http://localhost:8080/signup', {email, password, nickname});
        if (response.status >= 200 && response.status < 300) {
            // console.log('success')
            onSuccess(response.data)
        } else {
            // console.log('status bad')
            onError(response.status)
        }
    } catch (e) {
        // console.log(e)
        onError(e.message);
    }
};