import React, {Fragment} from "react";
import {Form} from "../../../components/form/form";

import {validationSchema_newUser} from "../../../components/form/__validationSchema/form__validationSchema_newUser";
import {prepareDataForRequest} from "../../requests/prepareDataForRequest";
import {submitNewUserForm} from "../../requests/submitNewUserForm";
import {useGlobal} from "../../../store";

import './newUserForm.css'

export const NewUserForm = ({className, endRegistration}) => {
    const template = ['login', 'email', 'password'];
    const [globalState, globalActions] = useGlobal();

    const onError = (e) => {
        globalActions.setPopup({error: e})};

    const onSuccess = () => {
        endRegistration();
        globalActions.setPopup({success: 'Success! Now you can log in.'});
    };

    const onSubmit = (values) => {
        const data = prepareDataForRequest(template, values);
        submitNewUserForm(data, onSuccess, onError);
    };

    return (<Fragment>
        <Form className={className}
              inputs={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
    </Fragment>)
}