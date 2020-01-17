export const prepareUserValuesForNewGame = (data, playersFromState, roomId)=> {

    const {names, card1, card2} = data;
    const makePlayersValid = playersOptions => {
        return playersOptions.map(option => {
            return {
                playerId: option.value,
                role: "attacker"
            }
        })
    };

    return   {
        "firstScore": card2.teamOne,
        "firstTeam": makePlayersValid(card1.teamOne),
        "roomId": roomId,
        "secondScore": card2.teamTwo,
        "secondTeam": makePlayersValid(card1.teamTwo),
    }
};