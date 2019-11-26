import axios from "axios";

export const submitNewUserForm = async (data, onSuccess, onError) => {
    let {email, password, login: nickname} = data;

    try {
        const response = await axios.post('/api/signup', {email, password, nickname});
        if (response.status >= 200 && response.status < 300) {
            // console.log('success')
            onSuccess(response.data)
        } else {
            // console.log('status bad')
            onError(response.status)
        }
    } catch (e) {
        // let serverAnswer = JSON.parse(e.request.response)
        // console.log(serverAnswer.message)
        onError(e.message);
    }
};