import axios from "axios";

export const postPlayer = async (user, roomId, name, onError) => {

    try {
        const request = await axios.post(
            `/api/room/${roomId}/create-player/`,
            {nickname:name+''},
            {auth: user.auth});
        return request.data
        }
    catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};