import React from 'react';
import {useGlobalStateHook} from "./helpers/useGlobalStateHook";
import * as actions from './actions'

let store = {
    rooms: [],
    games: [],
    players:[],
    popup: {
        // error: undefined,
        // message: undefined
    }
};

export const useGlobal = useGlobalStateHook(store, actions);
