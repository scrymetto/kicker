import axios from "axios";

export const deleteRoom = async (user, id, onError) => {

    try {
        const request = await axios.delete(
            `/api/room/${id}`,
            {
                id: id,
                auth: user.auth
            });
        return true
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};