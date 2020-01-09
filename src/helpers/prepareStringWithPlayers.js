export const prepareStringWithPlayers = (array, players) => {
    let string = '';
    array.forEach((player, index) => {
        const nickname = players[player.playerId];
        if (index !== 0 && string[0]) {
            string += ', '
        }
        // const playerRole = player.role;
        // if (playerRole) {
        //     string += nickname /*+ ' (' + player.function + ')'*/;
        // } else
            string += nickname;

    });
    return string
};