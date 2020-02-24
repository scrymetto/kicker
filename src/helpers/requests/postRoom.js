import axios from "axios";

export const postRooms = async (user, name) => {

    const request = await axios.post(
        '/api/room',
        {name: name.name},
        {auth: user.auth}
    );
    return request.data
    //let serverAnswer = JSON.parse(e.request.response)
};