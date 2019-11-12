import axios from "axios";

export const getGames = async (user, roomId, onSuccess, onError) => {

    try {
        // const games = await axios.get(`http://localhost:8080/room/${roomId}`, {auth: user.auth});
        const games = require('../../../__mocks__/games');
        onSuccess(games);
        // onSuccess(games.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};