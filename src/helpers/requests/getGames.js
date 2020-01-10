import axios from "axios";

export const getGames = async (user, roomId, page, onSuccess, onError) => {

    try {
        const games = await axios.get(`/api/game?page=${page}&roomId=${roomId}&size=5`, {auth: user.auth});
        // const games = require('../../../__mocks__/games');
        // const games = [];
        // onSuccess(games);
        onSuccess(games.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};