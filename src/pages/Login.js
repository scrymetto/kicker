import React, {useState} from "react";

import "../components/container/margin.css";
import "../components/container/flex_center.css";
import "../components/text/text_attention.css";
import "../components/text/text_additional.css";

import {Card} from "../components/card/card";
import {Login} from "../helpers/components/loginForm/loginForm";
import {NewUserForm} from "../helpers/components/newUserForm/newUserForm";
import {Button} from "../components/button/button";

//TODO: you can see login and password in Base64 in header Authorisation!

export function LoginPage() {

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
    const endRegistration = () => {
        setDisplayLoginForm(true)
    };

    const onClick = () => setDisplayLoginForm(!displayLoginForm);

    return (
        <Card
            headerText='Hi, stranger!'
            render={() =>
                <>
                    {newUserFormClassName === 'form form_newUser_visible'
                    && <div className='container flex_center'>
                        <p className='text text_attention'>Please note!</p>
                        <p className='text text_additional'>This site uses basic-authorization and you don't need to
                            confirm your email address. You can use anything as your mailing address, but we recommend
                            to use the mail, which you can check (because we are working on lots of features now and
                            if
                            you want to save your progress and see your new opportunities, we need to know, how we can
                            let you know about them). If you want just check the functionality of this site, you can use
                            the login "qwe@qwe.qwe" with the password "qwe". Let's play! &#129336;</p>
                    </div>
                    }
                    <Login className={loginFormClassName}/>
                    <NewUserForm className={newUserFormClassName} endRegistration={endRegistration}/>
                    <div className='container margin_15'>
                        <Button className='button button_underlinedText'
                                onClick={onClick}
                                text={text}/>
                    </div>
                </>
            }
        />
    )
}

