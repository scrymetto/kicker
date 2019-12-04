import axios from "axios";

export const postGame = async (user, roomId, data, onError) => {

    try {
        // const request = await axios.post(
        //     `/api/room/${roomId}`,
        //     data,
        //     {auth: user.auth});
        // return request.data
        return {
            "id": Math.random()*1000000,
            "firstTeam": {
                "id": Math.random()*1000000,
                "name": data.firstTeam.name,
                "players": data.firstTeam.players,
                "points": data.firstTeam.points
            },
            "secondTeam": {
                "id": Math.random()*1000000,
                "name": data.secondTeam.name,
                "players": data.secondTeam.players,
                "points": data.secondTeam.points
            }
        }
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};