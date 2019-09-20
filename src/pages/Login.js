import React, {Fragment, useState} from "react";

import "../components/text/text_link.css";
import "../components/container/margin_15.css";

import {Form} from "../components/form/form"
import {Card} from "../components/card/card";
import {Popup} from "../components/popup/popup";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'
import {useAuth} from "../helpers/auth&route/authContext";
import {submitForm} from "../helpers/submitForm";

const Login = ({className}) => {
    let template = ['email', 'password'];
    let [isError, setError] = useState(false);
    let {setAuthToken} = useAuth();
    let onSubmit = (values) => submitForm(values, template, 'POST', '/', setAuthToken, setError);

    return (<Fragment>
            {isError && <div className='container'><p className='text text_error'>Something was wrong.</p></div>}
            <Form className={className}
                  input={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={onSubmit}
            />
        </Fragment>
    )
};

const NewUserForm = ({className, endRegistration}) => {
    let template = ['login', 'email', 'password'];
    let [isError, setError] = useState(false);

    let onSubmit = (values) => submitForm(values, template, 'POST', '/', endRegistration, setError);
    return (<Fragment>
        {isError &&
        <div className='container'><p className='text text_error'>Something was wrong.</p></div>}
        <Form className={className}
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat the password'}]}
              initial={{login: '', email: '', password: '', repeatThePassword: ''}}
              validationSchema={validationSchema_newUser}
              onSubmit={onSubmit}/>
    </Fragment>)
};

export const LoginPage = () => {

    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    let [popup, showPopup] = useState(false);

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
    let endRegistration = () => {
        showPopup(true);
        setDisplayLoginForm(true)
    };

    return (
        <Card
            headerText='Hi, stranger!'
            render={() => <Fragment>
                {popup
                    ? <Popup text='sadf' onclick={() => showPopup(false)} textForButton='Login'/>
                    : <Fragment>
                        <Login className={loginFormClassName}/>
                        <NewUserForm className={newUserFormClassName} endRegistration={endRegistration}/>
                        <div className='container'>
                            <p className='text text_link'
                               onClick={() => setDisplayLoginForm(!displayLoginForm)}>{text}</p>
                        </div>
                    </Fragment>
                }
            </Fragment>}
        />
    )
};