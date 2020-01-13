export const prepareStringWithPlayers = (arrayWithIdsObj, objWithPlayers) => {
    let string = '';
    arrayWithIdsObj.forEach((player, index) => {
        const nickname = objWithPlayers[player.playerId];
        if (index !== 0 && string[0] && nickname.length !== 0) {
            string += ', '
        }
        // const playerRole = player.role;
        // if (playerRole) {
        //     string += nickname /*+ ' (' + player.function + ')'*/;
        // } else
        string += nickname;

    });
    console.log(string)
    return string
};