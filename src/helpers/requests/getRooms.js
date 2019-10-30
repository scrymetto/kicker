import axios from "axios";

export const getRooms = async (user, onSuccess, onError) => {

    try {
        const rooms = await axios.get('http://localhost:8080/room', {auth: user.auth});
        onSuccess(rooms.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};