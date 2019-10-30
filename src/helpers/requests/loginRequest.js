import axios from "axios";

export const loginRequest = async (data, onSuccess, onError) => {
    const auth = {username: data.email, password: data.password};
    try {
        const serverAnswer = await axios.post('http://localhost:8080/login', {}, {auth: auth});
        onSuccess({username: data.email, password: data.password});
        // console.log(serverAnswer)
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};