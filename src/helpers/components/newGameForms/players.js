import React, {useCallback} from "react";

import {Form} from "../../../components/form/form";
import {validationSchema_newGame__players} from "../../../components/form/__validationSchema/form__validationSchema_newGame";
import {useGlobal} from "../../../store";

function makeOptionValid(id, arr) {
    return {
        value: id,
        label: arr[id]
    }
}


export const Players = ({initial, setNewStatus, nameInState}) => {

    const globalState = useGlobal()[0];
    const players = [];

    let validInitial = {};
    if (initial.teamOne.length > 0 && !initial.teamOne[0].label) {
        validInitial.teamOne = initial.teamOne.map(id => makeOptionValid(id, globalState.players))
    }
    if (initial.teamTwo.length > 0 && !initial.teamTwo[0].label) {
        validInitial.teamTwo = initial.teamTwo.map(id => makeOptionValid(id, globalState.players))
    }
    for (let key in globalState.players) {
        players.push(makeOptionValid(key, globalState.players))
    }

    const inputs = [{
        select: 'team one',
        options: players,
        isSearchable: false

    }, {
        select: 'team two',
        options: players,
        isSearchable: false
    }];

    const onSubmit = useCallback((ids) => {
        setNewStatus('next', ids, nameInState)
    }, [setNewStatus, nameInState]);

    return <>
        <div className='margin_left_40'>
            <p className='text'>Select the players &#127939;</p>
        </div>
        <Form
            noOptionText={'First, you have to add players in \'Actions\'.'}
            className='form'
            initial={validInitial.teamOne ? validInitial : initial}
            inputs={inputs}
            validationSchema={validationSchema_newGame__players}
            onSubmit={onSubmit}
            withRoundButton
        />
    </>
};