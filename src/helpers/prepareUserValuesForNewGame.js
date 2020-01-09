export const prepareUserValuesForNewGame = (data, playersFromState, roomId)=> {
    const {names, players, scores} = data;
console.log(data)
    const makePlayersValid = playersOptions => {
        return playersOptions.map(option => {
            return {
                playerId: option.value,
                role: "attacker"
            }
        })
    };

    return   {
        "firstScore": scores.teamOne,
        "firstTeam": makePlayersValid(players.teamOne),
        "roomId": roomId,
        "secondScore": scores.teamTwo,
        "secondTeam": makePlayersValid(players.teamTwo),
    }
};