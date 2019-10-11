import axios from "axios";

export const submitNewUserForm = async (data, url, onSuccess, onError) => {
    try {
        const response = await axios.post(url, data);
        if (response.status >= 200 && response.status < 300) {
            onSuccess(response.data)
        } else {
            onError(response.status)
        }
    } catch (e) {
        onError(e.name);
    }
};