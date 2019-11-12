import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'

export const prepareGamesForTable = (games) => {

    return games.map((game) => {
        let {firstTeam, secondTeam} = game;
        let {name: firstTeamName = 'Unnamed team', points: firstTeamScore = '-'} = firstTeam;
        let {name: secondTeamName = 'Unnamed team', points: secondTeamScore = '-'} = secondTeam;
        let firstTeamPlayers = prepareStringWithPlayers(firstTeam.players);
        let secondTeamPlayers = prepareStringWithPlayers(secondTeam.players);
        let firstTeamCell =
            <Fragment>
                <p className='text text_oblique'>
                    {firstTeamName}
                </p>
                <p className='text text_additional'>
                    {firstTeamPlayers}
                </p>
            </Fragment>;
        let secondTeamCell =
            <Fragment>
                <p className='text text_oblique'>
                    {secondTeamName}
                </p>
                <p className='text text_additional'>
                    {secondTeamPlayers}
                </p>
            </Fragment>;
        let score = firstTeamScore + ':' + secondTeamScore;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

// function makeFirstLetterUppercase(string) {
//     return string[0].toUpperCase() + string.slice(1)
// }
//
// const prepareStringWithPlayers = (array) => {
//     let string = '';
//     array.forEach((player, index) => {
//         let playerFunction = player.function;
//         if (playerFunction) {
//             let article = player.function === 'attacker' ? ' an ' : ' a ';
//             string += makeFirstLetterUppercase(player.name) + ' as' + article + player.function;
//         } else string += makeFirstLetterUppercase(player.name);
//         if (index === array.length - 2) {
//             string += ' and '
//         } else if (index !== array.length - 1) {
//             string += ', '
//         }
//     });
//     return string
// };

// let columns = ['team', 'score', 'opponent'];
// const games = [
//     {
//         "id": "0",
//         "firstTeam": {
//             "id": "0",
//             "name": 'dfgh',
//             "players": [
//                 {
//                     "id": "1",
//                     "name": "Vasja",
//                     "function": "attacker"
//                 },
//                 {
//                     "id": "2",
//                     "name": "Kolja",
//                     "function": "defender"
//                 },
//                 {
//                     "id": "1",
//                     "name": "Vasja",
//                     "function": ""
//                 },
//             ],
//             "points": 8
//         },
//         "secondTeam": {
//             "id": "1",
//             "name": 'sdzfg',
//             "players": [
//                 {
//                     "id": "3",
//                     "name": "Petja",
//                     "function": "solo"
//                 },
//             ],
//             "points": 10
//         }
//     },
//     {
//         "id": "0",
//         "firstTeam": {
//             "id": "0",
//             "name": 'dfgh',
//             "players": [
//                 {
//                     "id": "1",
//                     "name": "Vasja",
//                     "function": "attacker"
//                 },
//                 {
//                     "id": "2",
//                     "name": "Kolja",
//                     "function": "defender"
//                 },
//                 {
//                     "id": "1",
//                     "name": "Vasja",
//                     "function": ""
//                 },
//             ],
//             "points": 8
//         },
//         "secondTeam": {
//             "id": "1",
//             "name": 'sdzfg',
//             "players": [
//                 {
//                     "id": "3",
//                     "name": "Petja",
//                     "function": "solo"
//                 },
//             ],
//             "points": 10
//         }
//     }
// ];
//
// prepareGamesForTable(games, columns);
