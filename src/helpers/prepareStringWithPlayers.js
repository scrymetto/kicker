import {makeFirstLetterUppercase} from "./makeFirstLetterUppercase";

export const prepareStringWithPlayers = (array) => {
    let string = '';
    array.forEach((player, index) => {
        let playerFunction = player.function;
        if (playerFunction) {
            string += makeFirstLetterUppercase(player.name) + ' (' + player.function + ')';
        } else string += makeFirstLetterUppercase(player.name);
        if (index !== array.length - 1) {
            string += ',  '
        }
    });
    return string
};