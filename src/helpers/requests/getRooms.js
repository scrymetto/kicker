import axios from "axios";

export const getRooms = async (user) => {

    const rooms = await axios.get('/api/room', {auth: user.auth});
    return rooms.data;
};