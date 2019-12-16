import axios from "axios";

export const getPlayers = async (user, roomId, onSuccess, onError) => {

    try {
        // const games = await axios.get(`/api/room/${roomId}`, {auth: user.auth});
        const players = require('../../../__mocks__/players');
        onSuccess(players);
        // onSuccess(games.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};