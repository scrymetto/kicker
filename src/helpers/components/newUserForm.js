import React, {Fragment} from "react";
import {submitNewUserForm} from "../requests/submitNewUserForm";
import {Form} from "../../components/form/form";
import {validationSchema_newUser} from "../../components/form/__validationSchema/form__validationSchema_newUser";
import {prepareDataForRequest} from "../requests/prepareDataForRequest";
import {useGlobal} from "../../store";

export const NewUserForm = ({className, endRegistration}) => {
    let template = ['login', 'email', 'password'];
    let [globalState, globalActions] = useGlobal();

    let onError = (e) => globalActions.setPopup({error: e});

    let onSuccess = () => {
        endRegistration();
        globalActions.setPopup({success: 'Success! Now you can log in.'});
    };

    let onSubmit = (values) => {
        let data = prepareDataForRequest(template, values);
        submitNewUserForm(data, onSuccess, onError);
    };

    return (<Fragment>
        <Form className={className}
              inputs={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
    </Fragment>)
};