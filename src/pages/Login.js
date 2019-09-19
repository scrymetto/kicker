import React, {Fragment, useState} from "react";
import "../components/text/text_link.css";
import "../components/container/margin_15.css";
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