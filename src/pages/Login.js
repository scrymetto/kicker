import React, {Fragment, useState} from "react";
import "../components/text/text_link.css";
import {Form} from "../components/form/form"
import {Card} from "../components/card/card";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'

const Login = ({className}) => (
    <Form className={className}
          input={[{email: 'email'}, {password: 'password'}]}
          initial={{email: '', password: ''}}
          validationSchema={validationSchema_login}/>
);

const NewUserForm = ({className}) => (
    <Form className={className}
          input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
          initial={{login: '', email: '', password: '', repeatThePassword: ''}}
          validationSchema={validationSchema_newUser}/>
);

export const LoginPage = () => {
    const [displayLoginForm, setDisplayLoginForm] = useState(true);

    let loginFormClassName, newUserFormClassName, text;
    if (displayLoginForm) {
        loginFormClassName = 'form form_login_visible';
        newUserFormClassName = 'form form_newUser_hidden';
        text = 'I\'m not an user'
    } else {
        loginFormClassName = 'form form_login_hidden';
        newUserFormClassName = 'form form_newUser_visible';
        text = 'I have a login'
    }
    return (
        <Card
            render={() =>
                <Fragment>
                    <Login className={loginFormClassName}/>
                    <NewUserForm className={newUserFormClassName}/>
                    <p className='text text_link'
                       onClick={() => setDisplayLoginForm(!displayLoginForm)}>{text}</p>
                </Fragment>}/>
    )
};