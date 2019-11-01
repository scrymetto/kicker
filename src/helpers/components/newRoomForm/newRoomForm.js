import React, {Fragment, useState} from 'react';
import {validationSchema_newRoom} from "../../../components/form/__validationSchema/form__validationSchema_newRoom";
import {Form} from "../../../components/form/form";
import {Button} from "../../../components/button/button";
import {CSSTransition} from "react-transition-group";

import './newRoomForm.css'

export const NewRoomFrom = ({onSubmit, setFormVisible}) => {
    let [inProp, setInProp] = useState(true);
    let onFormSubmit = (values) => {
        onSubmit(values);
        setInProp(false)
    };

    return (
        <Fragment>
            <CSSTransition timeout={300} classNames='newRoomForm_visible' in={inProp} appear={true}>
                <Form className='form newRoomForm_visible'
                      initial={{name: ''}}
                      validationSchema={validationSchema_newRoom}
                      input={[{text: 'name'}]}
                      onSubmit={(values) => onFormSubmit(values)}/>
            </CSSTransition>
            <CSSTransition timeout={300} classNames='button_animation' in={inProp} appear={true}>
                <Button
                    className='button button_back'
                    onClick={() => {
                        setInProp(false);
                        setTimeout(setFormVisible, 300, false)
                    }}/>
            </CSSTransition>
        </Fragment>
    )
};