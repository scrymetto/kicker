export const prepareUserValuesForNewGame = (data, playersFromState, roomId)=> {

    const {card1, card2} = data;
    const makePlayersValid = playersOptions => {
        return playersOptions.map(option => {
            return {
                playerId: option.value,
                role: "attacker"
            }
        })
    };

    return   {
        "firstScore": card2.teamOne.value,
        "firstTeam": makePlayersValid(card1.teamOne),
        "roomId": roomId,
        "secondScore": card2.teamTwo.value,
        "secondTeam": makePlayersValid(card1.teamTwo),
    }
};