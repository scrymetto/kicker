import React, {Fragment, useState} from "react";
import {submitNewUserForm} from "../requests/submitNewUserForm";
import {Form} from "../../components/form/form";
import {validationSchema_newUser} from "../../components/form/__validationSchema/form__validationSchema_newUser";
import {Popup} from "../../components/popup/popup";
import {prepareDataForRequest} from "../requests/prepareDataForRequest";

export const NewUserForm = ({className, endRegistration}) => {
    let template = ['login', 'email', 'password'];
    let [error, setError] = useState(false);
    let [success, setSuccess] = useState(false);

    let onError = (error) => {
        setError(error);
    };

    let onSuccess = () => {
        endRegistration();
        setSuccess(true)
    };

    let onSubmit = (values) => {
        let data = prepareDataForRequest(template, values);
        submitNewUserForm(data, onSuccess, onError);
    };

    return (<Fragment>
        <Form className={className}
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
        {error
            ? <Popup className='popup popup_error' text={error} />
            :null}
        {success
            ? <Popup className='popup popup_success' text='Success! Now you can log in.' />
            :null}

    </Fragment>)
};