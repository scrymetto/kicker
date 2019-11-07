// export
"use strict";
// import {makeFirstLetterUppercase} from "./makeFirstLetterUppercase";

function makeFirstLetterUppercase (string) {
    return string[0].toUpperCase() + string.slice(1)
}

const prepareGamesForTable = (games, columns) => {
    games.map((game) => {
        console.log(game)
        let {firstTeam, secondTeam}= game;
        console.log(firstTeam)
        let {name: firstTeamName, points: firstTeamScore} = firstTeam;
        let {name: secondTeamName, points: secondTeamScore} = secondTeam;
        let firstTeamPlayers = '';
        firstTeam.players.forEach((player, index) => {
            firstTeamPlayers += makeFirstLetterUppercase(player.name) + ' as ' + player.function;
            if (index===firstTeam.players.length-2){
                firstTeamPlayers+=' and '
            } else if (index!==firstTeam.players.length-1) {
                firstTeamPlayers+=', '
            }
        });
        console.log(firstTeamPlayers)
    })
};

let columns = ['team', 'score', 'opponent'];
const games = [
    {
        "id": "0",
        "firstTeam": {
            "id": "0",
            "name": 'dfgh',
            "players": [
                {
                    "id": "1",
                    "name": "Vasja",
                    "function": "attacker"
                },
                {
                    "id": "2",
                    "name": "Kolja",
                    "function": "defender"
                },
                {
                    "id": "1",
                    "name": "Vasja",
                    "function": "attacker"
                },
            ],
            "points": 8
        },
        "secondTeam": {
            "id": "1",
            "name": 'sdzfg',
            "players": [
                {
                    "player": {
                        "id": "3",
                        "name": "Petja"
                    },
                    "function": "solo"
                },

            ],
            "points": 10
        }
    }
];

prepareGamesForTable(games, columns);
