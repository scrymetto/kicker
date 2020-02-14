import axios from "axios";

export const getTheLastGameId = async (user, roomId, onError) => {

    try {
        const answer = await axios.get(`/api/game/last-id?roomId=${roomId}`, {auth: user.auth});
        return answer.data.value
    } catch (e) {
        onError(e.message);
    }
};