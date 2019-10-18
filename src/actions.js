export const addNewRoom = (store, newRoom) => {
    let rooms = store.state.rooms;
    let newRooms = rooms.push(newRoom);
    store.setState(newRooms)
}