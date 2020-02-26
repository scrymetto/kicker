import axios from "axios";

export const postPlayer = async (user, roomId, name) => {

    const request = await axios.post(
        `/api/room/${roomId}/create-player/`,
        {nickname: name + ''},
        {auth: user.auth});
    return request.data
};