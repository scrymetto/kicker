import axios from "axios";

export const loginRequest = async (data, onError) => {
    const auth = {username: data.email, password: data.password};
    try {
        const serverAnswer = await axios.post('/api/login', {}, {auth: auth});
        return {username: data.email, password: data.password}
        // console.log(serverAnswer)
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};