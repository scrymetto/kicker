import React, {Fragment} from 'react';
import {validationSchema_newRoom} from "../../../components/form/__validationSchema/form__validationSchema_newRoom";
import {Form} from "../../../components/form/form";
import {Button} from "../../../components/button/button";
import {CSSTransition} from "react-transition-group";

import './newRoomForm.css'

export const NewRoomFrom = ({onSubmit, goBack, status}) => {

    return (
        <Fragment>
            <CSSTransition timeout={300} classNames='newRoomForm_visible' in={status} appear={true}>
                <Form className='form newRoomForm_visible'
                      initial={{name: ''}}
                      validationSchema={validationSchema_newRoom}
                      inputs={[{text: 'name'}]}
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