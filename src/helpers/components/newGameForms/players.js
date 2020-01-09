import React, {Fragment} from "react";

import {Form} from "../../../components/form/form";
import {validationSchema_newGame__players} from "../../../components/form/__validationSchema/form__validationSchema_newGame";
import {useGlobal} from "../../../store";

export const Players = ({initial, setNewStatus}) => {

    const [globalState, globalActions] = useGlobal();
    const players = [];
    for (let key in globalState.players) {
        players.push({
            value: key,
            label: globalState.players[key]
        })
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

    const onSubmit = (ids) => {
        const teamOne = ids.teamOne.map(id =>{return {value:id, label:globalState.players[id]}});
        const teamTwo = ids.teamTwo.map(id =>{return {value:id, label:globalState.players[id]}});
        setNewStatus('next', {teamOne, teamTwo}, 'players')
    };

    return <Fragment>
        <div className='margin_left_40'>
            <p className='text' data-testid='players'>Select the players &#127939;</p>
        </div>
        <Form
            className='form'
            initial={initial}
            inputs={inputs}
            validationSchema={validationSchema_newGame__players}
            onSubmit={onSubmit}
            withRoundButton
        />
    </Fragment>
};