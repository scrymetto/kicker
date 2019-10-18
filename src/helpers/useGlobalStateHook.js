import React, {useState, useEffect} from 'react';

function setState(newState) {
    this.state = {...this.state, ...newState};
    console.dir(this.state)
    this.listeners.forEach(listener => listener(this.state))
}

function useNewListener() {
    const newListener = useState()[1];
    useEffect(() => {
        this.listeners.push(newListener);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== newListener)
        }
    }, []);
    return [this.state, this.actions]
}

function bindActionsToStore(store, actions) {
    let boundActions = {};
    Object.keys(actions).forEach((key)=>{
        boundActions[key] = actions[key].bind(null, store)
    });
    return boundActions
}

export const useGlobalStateHook = (initialState, actions) => {
    let store = {state: initialState, listeners: []};
    store.setState = setState.bind(store);
    store.actions = bindActionsToStore(store, actions);
    return useNewListener.bind(store)
};