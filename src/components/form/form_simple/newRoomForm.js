import React, {Fragment} from 'react';
import {Form} from "../form";
import {Button} from "../../button/button";
import {CSSTransition} from "react-transition-group";

import './newRoomForm.css'

export const Form_simple = ({onSubmit, goBack, status, initial, validationSchema, inputs}) => {

    return (
        <Fragment>
            <CSSTransition timeout={300} classNames='form_simple' in={status} appear={true}>
                <Form className='form form_simple'
                      initial={initial}
                      validationSchema={validationSchema}
                      inputs={[{text: inputs}]}
                      onSubmit={onSubmit}/>
            </CSSTransition>
            <CSSTransition timeout={300} classNames='button_animation' in={status} appear={true}>
                <Button
                    className='button button_back'
                    onClick={() => {
                        goBack()
                    }}/>
            </CSSTransition>
        </Fragment>
    )
};