import axios from "axios";

export const loginRequest = async (data, onSuccess, onError) => {
    const auth = {username: data.email, password: data.password};
    try {
        const serverAnswer = await axios.post('http://localhost:8080/login', {},{auth:auth});
        if (serverAnswer.status >= 200 && serverAnswer.status < 300) {
            onSuccess({username: data.email, password: data.password});
            // console.log(serverAnswer)
        } else {
            onError(serverAnswer.status)
        }
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};