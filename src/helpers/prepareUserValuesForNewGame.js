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
        "roomId": roomId,
        "firstTeam": {
            players: makePlayersValid(card1.teamOne),
            score: card2.teamOne.value,
        },
        "secondTeam": {
            players: makePlayersValid(card1.teamTwo),
            score: card2.teamTwo.value,
        }
    }
};