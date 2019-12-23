export const addNewInState = (store, something, key) => {
    const prev = store.state[key];
    let somethingNew;
    if(Array.isArray(something)){
        somethingNew = {[key]: [...prev, ...something]};
    } else {
        somethingNew = {[key]: [...prev, something]};
    }
    store.setState(somethingNew)
};

export const addStateFromServer = (store, something, key) => {
    const somethingNew = {[key]: [...something]};
    store.setState(somethingNew)
};

export const setPopup = (store, obj) => {
    store.setState({popup: obj});
};

export const deleteFromState = (store, id, key) => {
    const newState = store.state[key].filter(something=>something.id!==id);
    store.setState({[key]:newState})
};