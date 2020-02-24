import axios from "axios";

export const getStatisticData = async (user, room) => {

    const statistic = await axios.get(`/api/statistic/room/${room}`, {auth: user.auth});
    return statistic.data;
};