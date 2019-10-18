import axios from "axios";

export const getRooms = async (data, onSuccess, onError) => {
    const auth = {username: data.email, password: data.password};
    try {
        const rooms = await axios.get('http://localhost:8080/room', {auth:auth});
        if (rooms.status >= 200 && rooms.status < 300) {
            onSuccess({username: data.email, password: data.password});
            // console.log(rooms.data)
            return rooms.data
        } else {
            onError(rooms.status)
        }
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};