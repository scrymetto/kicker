export const addNewRoom = (store, newRoom) => {
    let rooms = store.state.rooms;
    let newRooms = {rooms: [...rooms, newRoom]};
    store.setState(newRooms)
};

export const addRoomsFromServer = (store, rooms) => {
    let roomsFromServer = {rooms: [...rooms]};
    store.setState(roomsFromServer)
};

export const setErrorState = (store, message) => {
    store.setState({isError: message});
    setTimeout(()=> store.setState({isError: false}), 10000)
};

export const addGamesFromServer = (store, games) => {
    let gamesFromServer = {games: [...games]};
    store.setState(gamesFromServer)
};