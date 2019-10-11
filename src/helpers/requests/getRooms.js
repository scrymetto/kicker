import axios from "axios";

export const getRooms = async (data, onError) => {
    try {
        const rooms = await axios.get('/', {
            params: {
                login: data.login,
                password: data.password
            }
        });
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