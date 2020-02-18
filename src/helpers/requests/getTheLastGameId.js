import axios from "axios";

export const getTheLastGameId = async (user, roomId) => {

        const answer = await axios.get(`/api/game/last-id?roomId=${roomId}`, {auth: user.auth});
        return answer.data.value
};