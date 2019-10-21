import axios from "axios";

export const getRooms = async (user, onSuccess, onError) => {

    try {
        const rooms = await axios.get('http://localhost:8080/room', {auth:user.auth});
        if (rooms.status >= 200 && rooms.status < 300) {
            onSuccess(rooms.data);
        } else {
            onError(rooms.status)
        }
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};