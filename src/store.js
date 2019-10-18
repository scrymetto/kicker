import React from 'react';
import {useGlobalStateHook} from "./helpers/useGlobalStateHook";
import * as actions from './actions'

let store = {
    rooms: [
        {name: 'blah'},
        {name: 'blahblah'}
    ]
};

export const useGlobal = useGlobalStateHook(store, actions);
