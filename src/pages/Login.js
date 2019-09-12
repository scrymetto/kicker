import React, {Fragment} from "react";
import "../components/text/text_link.css";
import {Form} from "../components/form/form"
import Card from "../components/card/card";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'

function showNewUserForm() {
    let form = document.getElementsByClassName('change')[0];
    form.className = form.className === 'form form_visible change' ? 'form form_hidden change' : 'form form_visible change';
}

const Login = () => (
    <Form input={[{email: 'email'}, {password: 'password'}]}
          initial={{email: '', password: ''}}
          validationSchema={validationSchema_login}/>
);

const NewUserForm = () =>
    (
        <Form className="form change form_hidden"
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat password'}]}
              initial={{login: '', email: '', password: '', repeatPassword: ''}}
              validationSchema={validationSchema_newUser}/>
    );

export const LoginPage = () => <Card
    render={() => <Fragment>
        <Login/>
        <p className='text text_link forForm' onClick={showNewUserForm}>I'm not a user</p>
        <NewUserForm/>
    </Fragment>}/>;