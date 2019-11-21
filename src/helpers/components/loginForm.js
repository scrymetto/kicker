import React, {Fragment, useState} from "react";
import {useAuth} from "../auth&route/authContext";
import {Form} from "../../components/form/form";
import {validationSchema_login} from "../../components/form/__validationSchema/form__validationSchema_login";
import {prepareDataForRequest} from "../requests/prepareDataForRequest";
import {loginRequest} from "../requests/loginRequest";
import {useGlobal} from "../../store";

export const Login = ({className}) => {

    let [globalState, globalActions] = useGlobal();
    let {setUser} = useAuth();

    let template = ['email', 'password'];

    let onError = (e) => {
        globalActions.setPopup({error: e});
    };
    let onSuccess = (user) => {
        setUser({auth: user})
    };
    let onSubmit = (values) => {
        // console.log('onSubmit works')
        let data = prepareDataForRequest(template, values);
        loginRequest(data, onSuccess, onError)
    };

    return (<Fragment>
            <Form className={className}
                  inputs={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={(values) => onSubmit(values)}
            />
        </Fragment>
    )
};