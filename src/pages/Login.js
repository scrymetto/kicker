import React, {Fragment, useState} from "react";

const axios = require('axios');

import "../components/text/text_link.css";
import "../components/container/margin_15.css";

import {Form} from "../components/form/form"
import {Card} from "../components/card/card";

import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'
import {prepareDataForRequest} from "../helpers/prepareDataForRequest";
import {useAuth} from "../helpers/authContext";

const Login = ({className}) => {
    let template = ['email', 'password'];
    let [isError, setError] = useState(false);
    let {setAuthToken} = useAuth();

    let error = '';

    let onSubmit = (values) => {
        let data = prepareDataForRequest(template, values);
        let header;
        axios({
            method: 'POST',
            url: '/',
            data: data,
            // headers: headers
        })
            .then(result => {
                if (result.status >= 200 && result.status < 300) {
                    setAuthToken(result.data)
                }
            })
            .catch(e => {
                error = e+'';
                setError(true);
            })
    };
    return (<Fragment>
            <Form className={className}
                  input={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={onSubmit}
            />
            {error && <p className='text text_error'>{error}</p>}
        </Fragment>
    )
};

const NewUserForm = ({className}) => {
    let template = ['login', 'email', 'password'];
    let onSubmit = (values) => {
        let data = prepareDataForRequest(template, values);

    };
    return (<Fragment>
            <Form className={className}
                  input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
                  initial={{login: '', email: '', password: '', repeatThePassword: ''}}
                  validationSchema={validationSchema_newUser}
                  onSubmit={onSubmit}/>
        </Fragment>
    );
};

export const LoginPage = () => {

    const [displayLoginForm, setDisplayLoginForm] = useState(true);

    let loginFormClassName, newUserFormClassName, text;
    if (displayLoginForm) {
        loginFormClassName = 'form form_login_visible';
        newUserFormClassName = 'form form_newUser_hidden';
        text = 'Don\'t have an account?'
    } else {
        loginFormClassName = 'form form_login_hidden';
        newUserFormClassName = 'form form_newUser_visible';
        text = 'Already have an account?'
    }
    return (
        <Card
            headerText='Hi, stranger!'
            render={() =>
                <Fragment>
                    <Login className={loginFormClassName}/>
                    <NewUserForm className={newUserFormClassName}/>
                    <div className='container'>
                        <p className='text text_link'
                           onClick={() => setDisplayLoginForm(!displayLoginForm)}>{text}</p>
                    </div>
                </Fragment>}/>
    )
};