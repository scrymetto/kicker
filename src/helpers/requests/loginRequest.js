import axios from "axios";

export const loginRequest = async (data) => {
    const auth = {username: data.email, password: data.password};
    const serverAnswer = await axios.post('api/login/', {}, {auth: auth});
    return {username: data.email, password: data.password}
};