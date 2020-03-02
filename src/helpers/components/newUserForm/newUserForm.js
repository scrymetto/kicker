import React, {useState} from "react";
import {Form} from "../../../components/form/form";

import {validationSchema_newUser} from "../../../components/form/__validationSchema/form__validationSchema_newUser";
import {prepareDataForLoginRequest} from "../../prepareDataForLoginRequest";
import {submitNewUserForm} from "../../requests/submitNewUserForm";
import {useGlobal} from "../../../store";
import {setErrorPopup} from '../../setErrorPopup'

import './newUserForm.css'
import {Spinner} from "../../../components/spinner/spinner";

const template = ['login', 'email', 'password'];
const inputs = [{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}];
const initial = {login: '', email: '', password: '', repeatThePassword: ''};

export const NewUserForm = ({className, endRegistration}) => {

    const globalActions = useGlobal()[1];

    const [spinner, setSpinner] = useState(false);

    const onError = (e) => {
        setSpinner(false);
        setErrorPopup(e, globalActions.setPopup)
    };

    const onSuccess = () => {
        setSpinner(false);
        endRegistration();
        globalActions.setPopup({success: 'Success! Now you can log in.'});
    };

    const onSubmit = (values) => {
        setSpinner(true);
        const data = prepareDataForLoginRequest(template, values);
        submitNewUserForm(data)
            .then(answer => {
                onSuccess(answer)
            })
            .catch(e => {
                onError(e)
            });
    };

    return (<>
        <Form className={className}
              inputs={inputs}
              initial={initial}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
        {spinner && <Spinner/>}
    </>)
};