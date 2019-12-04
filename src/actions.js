export const addNewInState = (store, something, key) => {
    let prev = store.state[key];
    let somethingNew = {[key]: [...prev, something]};
    store.setState(somethingNew)
};

export const addStateFromServer = (store, something, key) => {
    let somethingNew = {[key]: [...something]};
    store.setState(somethingNew)
};

export const setPopup = (store, obj) => {
    store.setState({popup: obj});
    setTimeout(()=> store.setState({popup: {}}), 6000)
};

export const addGamesFromServer = (store, games) => {
    let gamesFromServer = {games: [...games]};
    store.setState(gamesFromServer)
};

