import axios from "axios";

export const postGame = async (user, data) => {

    const request = await axios.post(
        `/api/game`,
        data,
        {auth: user.auth});
    return request.data
    // return {
    //     "id": Math.random()*1000000,
    //     "firstTeam": {
    //         "id": Math.random()*1000000,
    //         "name": data.firstTeam.name,
    //         "players": data.firstTeam.players,
    //         "points": data.firstTeam.points
    //     },
    //     "secondTeam": {
    //         "id": Math.random()*1000000,
    //         "name": data.secondTeam.name,
    //         "players": data.secondTeam.players,
    //         "points": data.secondTeam.points
    //     }
    // }
};