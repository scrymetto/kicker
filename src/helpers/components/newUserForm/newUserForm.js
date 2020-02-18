import React, {Fragment, useState} from "react";
import {Form} from "../../../components/form/form";

import {validationSchema_newUser} from "../../../components/form/__validationSchema/form__validationSchema_newUser";
import {prepareDataForLoginRequest} from "../../prepareDataForLoginRequest";
import {submitNewUserForm} from "../../requests/submitNewUserForm";
import {useGlobal} from "../../../store";

import './newUserForm.css'
import {Spinner} from "../../../components/spinner/spinner";

export const NewUserForm = ({className, endRegistration}) => {
    const template = ['login', 'email', 'password'];
    const [globalState, globalActions] = useGlobal();

    const [spinner, setSpinner] = useState(false);

    const onError = (e) => {
        setSpinner(false);
        globalActions.setPopup({error: e})
    };

    const onSuccess = () => {
        setSpinner(false);
        endRegistration();
        globalActions.setPopup({success: 'Success! Now you can log in.'});
    };

    const onSubmit = (values) => {
        setSpinner(true);
        const data = prepareDataForLoginRequest(template, values);
        submitNewUserForm(data, onSuccess, onError);
    };

    return (<Fragment>
        <Form className={className}
              inputs={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
        {spinner && <Spinner/>}
    </Fragment>)
};