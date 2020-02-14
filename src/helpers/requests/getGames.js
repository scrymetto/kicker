import axios from "axios";

export const getGames = async (user, roomId, previousId, onError) => {

    try {
        const games = await axios.get(`/api/game`, {
            auth: user.auth,
            params: {
                previousId: previousId,
                roomId: roomId,
                size: 5,
            }
        });
        // const games = require('../../../__mocks__/games');
        // const games = [];
        // onSuccess(games);
        return games.data;
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};