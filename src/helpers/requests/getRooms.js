import axios from "axios";

export const getRooms = async (data, onSuccess, onError) => {
    const user = {
        email: data.email,
        password: data.password
    };
    try {
        const rooms = await axios.get('/', {
            params: user
        });
        if (rooms.status >= 200 && rooms.status < 300) {
            onSuccess(user);
            return rooms.data
        } else {
            onError(rooms.status)
        }
    } catch (e) {
        onError(e.message);
    }
};