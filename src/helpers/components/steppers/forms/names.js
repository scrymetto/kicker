import React, {Fragment} from "react";

import {Form} from "../../../../components/form/form";
import {validationSchema_newGame__name} from "../../../../components/form/__validationSchema/form__validationSchema_newGame";

export const Names = ({initial, setNewStatus})=>{

    const inputs = [{string: 'team one'}, {string: 'team two'}]

    return <Fragment>
        <div className='margin_left_50'>
            <p className='text'>Come up with names for the teams &#9917;</p>
        </div>
        <Form
            className='form'
            initial={initial}
            inputs={inputs}
            validationSchema={validationSchema_newGame__name}
            onSubmit={(userValues) => setNewStatus('next', userValues, 'names')}
            withRoundButton
        />
    </Fragment>
}