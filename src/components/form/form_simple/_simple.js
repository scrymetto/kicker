import React, {useState, useCallback} from 'react';
import {Form} from "../form";
import {Button} from "../../button/button";
import {CSSTransition} from "react-transition-group";

import './_simple.css'
import PropTypes from "prop-types";

export const Form_simple = ({onSubmit, initial, validationSchema, input, close}) => {

    const [visible, setVisible] = useState(true);
    const onSubmitForm = useCallback(value => {
      setVisible(false);
      onSubmit(value);
    }, []);

    const inputs = [{text: input}];

    const onClick = useCallback(()=> setVisible(false), []);

    return (
        <>
            <CSSTransition timeout={300} classNames='form_simple' in={visible} appear onExited={close} unmountOnExit>
                <Form className='form form_simple'
                      initial={initial}
                      validationSchema={validationSchema}
                      inputs={inputs}
                      onSubmit={onSubmitForm}/>
            </CSSTransition>
            <CSSTransition timeout={300} classNames='button_animation' in={visible} appear onExited={close} unmountOnExit>
                <Button
                    className='button button_back'
                    onClick={onClick}/>
            </CSSTransition>
        </>
    )
};

Form_simple.propTypes = {
    initial: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    validationSchema: PropTypes.object.isRequired, // all inputs with Yup.object()
    input: PropTypes.string.isRequired, // name of the field
    onSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
};