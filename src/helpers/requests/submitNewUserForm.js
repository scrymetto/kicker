import axios from "axios";

export const submitNewUserForm = async (data) => {

    const {email, password, login: nickname} = data;
    const response = await axios.post('/api/signup', {email, password, nickname});
    return response.data
    // let serverAnswer = JSON.parse(e.request.response)
};