import React, {Fragment, useState} from "react";
import {useAuth} from "../auth&route/authContext";
import {submitForm} from "../submitForm";
import {Form} from "../../components/form/form";
import {validationSchema_login} from "../../components/form/__validationSchema/form__validationSchema_login";
import {Popup} from "../../components/popup/popup";

export const Login = ({className}) => {
    let template = ['email', 'password'];
    let [error, setError] = useState(false);
    let {setAuthToken} = useAuth();
    let onError = (errorMessage) => {
        setError(errorMessage);
    };
    let onSuccess = (data) => {
        setAuthToken(data);
    };
    let onSubmit = (values) => submitForm(values, template, 'POST', '/', onSuccess, onError);

    return (<Fragment>
            <Form className={className}
                  input={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={onSubmit}
            />
            {error
                ? <Popup className='popup popup_error' text={error}/>
                : null}
        </Fragment>
    )
};