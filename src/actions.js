export const addNewRoom = (store, newRoom) => {
    let rooms = store.state.rooms;
    let newRooms = {rooms: [...rooms, newRoom]};
    store.setState(newRooms)
};

export const addRoomsFromServer = (store, rooms) => {
    let roomsFromServer = {rooms: [...rooms]};
    store.setState(roomsFromServer)
};
