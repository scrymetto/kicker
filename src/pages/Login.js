import React, {Fragment} from "react";
import "../components/text/text_link.css";
import {Form} from "../components/form/form"
import Card from "../components/card/card";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'

function showOtherForm() {
    let text = document.getElementsByClassName('text_link')[0];
    let formLogin = document.getElementsByClassName('form_login')[0];
    let formNewUser = document.getElementsByClassName('form_newUser')[0];
    formLogin.className = formLogin.className === 'form form_login form_login_hidden'
        ? 'form form_login form_login_visible'
        : 'form form_login form_login_hidden';
    formNewUser.className = formNewUser.className === 'form form_newUser form_newUser_hidden'
        ? 'form form_newUser form_newUser_visible'
        : 'form form_newUser form_newUser_hidden';
    if (formNewUser.className === 'form form_newUser form_newUser_visible') {
        text.innerHTML = 'I have login';
    } else {
        text.innerHTML = 'I\'m not an user'
    }
}

const Login = () => (
    <Form className="form form_login form_login_visible"
          input={[{email: 'email'}, {password: 'password'}]}
          initial={{email: '', password: ''}}
          validationSchema={validationSchema_login}/>
);

const NewUserForm = () =>
    (
        <Form className="form form_newUser form_newUser_hidden"
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat password'}]}
              initial={{login: '', email: '', password: '', repeatPassword: ''}}
              validationSchema={validationSchema_newUser}/>
    );

export const LoginPage = () => <Card
    render={() => <Fragment>
        <Login/>
        <NewUserForm/>
        <p className='text text_link' onClick={showOtherForm}>I'm not an user</p>
    </Fragment>}/>;