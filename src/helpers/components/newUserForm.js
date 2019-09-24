import React, {Fragment, useState} from "react";
import {submitForm} from "../submitForm";
import {Form} from "../../components/form/form";
import {validationSchema_newUser} from "../../components/form/__validationSchema/form__validationSchema_newUser";
import {Popup} from "../../components/popup/popup";

export const NewUserForm = ({className, endRegistration}) => {
    let template = ['login', 'email', 'password'];
    let [error, setError] = useState(false);

    let onError = (errorMessage) => {
        setError(errorMessage);
    };

    let onSubmit = (values) => submitForm(values, template, 'POST', '/', endRegistration, onError);

    return (<Fragment>
        <Form className={className}
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
        {error
            ? <Popup className='popup popup_error' text={error} />
            :null}

    </Fragment>)
};