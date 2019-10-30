import React, {Fragment, useState} from "react";

import "../components/text/text_link.css";
import "../components/container/margin_15.css";

import {Card} from "../components/card/card";
import {Login} from "../helpers/components/loginForm";
import {NewUserForm} from "../helpers/components/newUserForm";

//TODO: you can see login and password in Base64 in header Authorisation!

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
    let endRegistration = () => {
        setDisplayLoginForm(true)
    };

    return (
        <Card
            headerText='Hi, stranger!'
            render={() =>
                <Fragment>
                    <Login className={loginFormClassName}/>
                    <NewUserForm className={newUserFormClassName} endRegistration={endRegistration}/>
                    <div className='container margin_15'>
                        <p className='text text_link'
                           onClick={() => setDisplayLoginForm(!displayLoginForm)}>{text}</p>
                    </div>
                </Fragment>
            }
        />
    )
};