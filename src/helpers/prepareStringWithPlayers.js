export const prepareStringWithPlayers = (array) => {
    let string = '';
    array.forEach((player, index) => {
        if (!player.name) return;
        if (index !== 0 && string[0]) {
            string += ', '
        }
        let playerFunction = player.function;
        if (playerFunction) {
            string += player.name + ' (' + player.function + ')';
        } else string += player.name;

    });
    return string
};