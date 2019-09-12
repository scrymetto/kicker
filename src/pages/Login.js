import React, {Fragment} from "react";
import "../components/text/text_link.css";
import {Form} from "../components/form/form"
import Card from "../components/card/card";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'


const Login = () => (
    <Form input={[{email: 'email'}, {password: 'password'}]}
          initial={{email: '', password: ''}}
          validationSchema={validationSchema_login}/>
);

const NewUserForm = () =>
    (<div>
        <p className='text text_link forForm'>I'm not a user</p>
        <Form className="form form_hidden"
              input={[{text: 'login'}, {email: 'email'}, {password: 'password'}, {password: 'repeat password'}]}
              initial={{login: '', email: '', password: '', repeatPassword: ''}}
              validationSchema={validationSchema_newUser}/>
    </div>);

export const LoginPage = () => <Card render={() => <Fragment><Login/><NewUserForm/></Fragment>}/>;