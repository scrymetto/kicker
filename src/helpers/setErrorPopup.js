const serverErrors = new Map([
    ['USER_NOT_PERMITTED', 'User data is invalid.'],
    ['USER_NOT_FOUND', 'User not found.'],
    ['USER_ALREADY_EXIST', 'User with this name is already exist. Please, reload the page and try to use another name.'],
    ['SERVER_ERROR', 'There are some problems with our server. Please, try again later.'],
    ['VALIDATION_ERROR', internalErrorText],
    ['ROOM_NOT_FOUND', 'Room not found.'],
]);

const internalErrorText = 'Internal error. Please, tell us about it by email to hempy.scrymetto@gmail.com or open an issue on https://github.com/scrymetto/kicker/issues (or https://gitlab.com/scrymetto/kicker/issues).';

export function setErrorPopup(e, hook) {
    let serverError;
    try {
        serverError = JSON.parse(e.request.response).errorCode;
    }
    catch (e) {
        serverError='';
    }

    let error = serverErrors.get(serverError);
    if (!error) {
        const status = e.response.status;
        if (status >= 300 && status < 400 || status >= 500) {
            error = 'Server error. Please, try again later.'
        }
        if (status >= 400 && status < 500) {
            error = internalErrorText
        }

    }
    hook({error: error})
}