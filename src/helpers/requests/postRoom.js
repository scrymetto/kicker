import axios from "axios";

export const postRooms = async (user, name, onError) => {

    try {
        const request = await axios.post(
            '/api/room',
            {name: name.name},
            {auth: user.auth});
            return request.data
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};