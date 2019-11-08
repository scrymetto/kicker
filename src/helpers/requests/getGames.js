import axios from "axios";

export const getGames = async (user, roomId, onSuccess, onError) => {

    try {
        // const games = await axios.get(`http://localhost:8080/room/${roomId}`, {auth: user.auth});
        const games = [
            {
                "id": "0",
                "firstTeam": {
                    "id": "0",
                    // "name": '',
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
                            "function": ""
                        },
                    ],
                    "points": 8
                },
                "secondTeam": {
                    "id": "1",
                    "name": 'sdzfg',
                    "players": [
                        {
                            "id": "3",
                            "name": "Petja",
                            "function": "solo"
                        },
                    ],
                    "points": 10
                }
            },
            {
                "id": "0",
                "firstTeam": {
                    "id": "0",
                    "name": 'sgnj',
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
                            "function": ""
                        },
                    ],
                    "points": 8
                },
                "secondTeam": {
                    "id": "1",
                    "players": [
                        {
                            "id": "3",
                            "name": "Petja",
                            "function": "solo"
                        },
                    ],
                    "points": 10
                }
            }
        ];
        onSuccess(games);
        // onSuccess(games.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};