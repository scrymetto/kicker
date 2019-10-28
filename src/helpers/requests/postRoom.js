import axios from "axios";
import {getRooms} from "./getRooms";

export const postRooms = async (user, name, onSuccess, onError) => {

    try {
        const request = await axios.post('http://localhost:8080/room', {name:name.name}, {auth:user.auth});
        if (request.status >= 200 && request.status < 300) {
            getRooms(user, onSuccess, onError)
        } else {
            onError(request.status)
        }
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};