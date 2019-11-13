export const prepareStringWithPlayers = (array) => {
    let string = '';
    array.forEach((player, index) => {
        let playerFunction = player.function;
        if (playerFunction) {
            string += player.name + ' (' + player.function + ')';
        } else string += player.name;
        if (index !== array.length - 1) {
            string += ',  '
        }
    });
    return string
};