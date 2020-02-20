const serverErrors = new Map([
    ['USER_NOT_PERMITTED', 'User data is invalid.'],
    ['USER_NOT_FOUND', 'User not found.'],
    ['USER_ALREADY_EXIST', 'User with this name is already exist.'],
    ['SERVER_ERROR', 'There are some problems with our server. Please, try again later.'],
    ['VALIDATION_ERROR', 'Data is invalid.'],
    ['ROOM_NOT_FOUND', 'Room not found.'],
]);

const serverStatuses = new Map([
    []
]);

export function setErrorPopup(e, hook) {
    const serverError = JSON.parse(e.request.response).errorCode;
    const error = serverErrors.get(serverError);
    if (!error){
        const status = e.response.status;

    }
    hook({error: error})
}