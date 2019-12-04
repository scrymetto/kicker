import React, {Fragment} from "react";

import {Form} from "../../../../components/form/form";
import {validationSchema_newGame__players} from "../../../../components/form/__validationSchema/form__validationSchema_newGame";

export const Players = ({initial, setNewStatus}) => {

    const inputs = [{
        select: 'team one',
        options: ['red', 'blue', 'orange', 'black', 'ftgyhifghjliulgfljgfdylutdkydrkyhdtrl,jhuft'],
    }, {
        select: 'team two',
        options: ['red', 'blue', 'orange', 'black', 'ftgyhifghjliulgfljgfdylutdkydrkyhdtrl,jhuft'],
    }];

    return <Fragment>
        <div className='margin_left_40'>
            <p className='text'>Select the players &#127939;</p>
        </div>
        <Form
            className='form'
            initial={initial}
            inputs={inputs}
            validationSchema={validationSchema_newGame__players}
            onSubmit={(userValues) => setNewStatus('next', userValues, 'players')}
            withRoundButton
        />
    </Fragment>
};