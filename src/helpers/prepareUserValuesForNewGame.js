export const prepareUserValuesForNewGame = ({names, players, scores})=> {
    let makePlayersValid = arrayOfPlayers => {
        return arrayOfPlayers.map(player => {return {name: player}})
    };
    return   {
        "firstTeam": {
            "name": names.teamOne,
            "players": makePlayersValid(players.teamOne),
            "points": scores.teamOne
        },
        "secondTeam": {
            "name": names.teamTwo,
            "players": makePlayersValid(players.teamTwo),
            "points": scores.teamTwo
        }
    }
};