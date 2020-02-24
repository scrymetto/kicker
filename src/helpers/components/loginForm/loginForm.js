import React, {Fragment, useState} from "react";
import {Form} from "../../../components/form/form";
import {Spinner} from "../../../components/spinner/spinner";

import {useGlobal} from "../../../store";
import {useAuth} from "../../auth&route/authContext";
import {validationSchema_login} from "../../../components/form/__validationSchema/form__validationSchema_login";
import {prepareDataForLoginRequest} from "../../prepareDataForLoginRequest";
import {loginRequest} from "../../requests/loginRequest";
import {setErrorPopup} from "../../setErrorPopup";


import './loginForm.css'

export const Login = ({className}) => {

    const globalActions = useGlobal()[1];
    const {setUser} = useAuth();

    const [spinner, setSpinner] = useState(false);

    const template = ['email', 'password'];

    const onError = (e) => {
        setSpinner(false);
        setErrorPopup(e, globalActions.setPopup);
    };

    const onSubmit = (values) => {
        setSpinner(true);
        const data = prepareDataForLoginRequest(template, values);
        loginRequest(data)
            .then(user => {
                setUser({auth: user})
            })
            .catch(e => {
                onError(e)
            })
    };

    return (<Fragment>
            <Form className={className}
                  inputs={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={(values) => onSubmit(values)}
            />
            {spinner && <Spinner/>}
        </Fragment>
    )
};