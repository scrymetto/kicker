import axios from "axios";

export const getRooms = async (onError) => {
    try {
        const rooms = await axios.get('/');
        if (rooms.status >= 200 && rooms.status < 300) {
            return rooms.data
        } else {
            onError(rooms.status)
        }
    } catch (e) {
        onerror(e);
        throw new Error(e)
    }
};