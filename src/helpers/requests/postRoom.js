import axios from "axios";

export const postRooms = async (user, name, onError) => {

    try {
        const request = await axios.post(
            'http://localhost:8080/room',
            {name: name.name},
            {auth: user.auth});
            return true
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};