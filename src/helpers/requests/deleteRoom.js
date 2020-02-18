import axios from "axios";

export const deleteRoom = async (user, id) => {
    const request = await axios.delete(
        `/api/room/${id}`,
        {
            id: id,
            auth: user.auth
        });
    return true
    //let serverAnswer = JSON.parse(e.request.response)
};