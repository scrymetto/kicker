export const addNewInState = (store, something, key) => {
    const prev = store.state[key];
    const somethingNew = Array.isArray(something)
        ? {[key]: [...prev, ...something]}
        : {[key]: [...prev, something]};
    store.setState(somethingNew)
};

export const addStateFromServer = (store, something, key) => {
    const somethingNew = Array.isArray(something)
        ? {[key]: [...something]}
        : {[key]: something};
    store.setState(somethingNew)
};

export const setPopup = (store, obj) => {
    store.setState({popup: obj});
};

export const deleteFromState = (store, id, key) => {
    const newState = store.state[key].filter(something => something.id !== id);
    store.setState({[key]: newState})
};

export const addNewKey = (store, stateKey, key, value) => {
    const prevState = store.state[stateKey];
    const newState = Object.assign(prevState, {[key]: value});
    store.setState({[stateKey]: newState})
};