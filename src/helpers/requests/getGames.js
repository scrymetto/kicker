import axios from "axios";

export const getGames = async (user, roomId, onSuccess, onError) => {

    try {
        // const games = await axios.get(`http://localhost:8080/room/${roomId}`, {auth: user.auth});
        const games = [
            {
                "id": "0",
                "firstTeam": {
                    "id": "0",
                    "name": 'dfgh',
                    "players": [
                        {
                            "player": {
                                "id": "1",
                                "name": "Vasja"
                            },
                            "function": "attacker"
                        },
                        {
                            "player": {
                                "id": "2",
                                "name": "Kolja"
                            },
                            "function": "defender"
                        }
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
        onSuccess(games);
        // onSuccess(games.data);
    } catch (e) {
        //let serverAnswer = JSON.parse(e.request.response)
        onError(e.message);
    }
};