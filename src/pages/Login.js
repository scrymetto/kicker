import React, {Fragment} from "react";
import "../components/text/text_link.css";
import {Form} from "../components/form/form"
import Card from "../components/card/card";
import {validationSchema_login} from '../components/form/__validationSchema/form__validationSchema_login'
import {validationSchema_newUser} from '../components/form/__validationSchema/form__validationSchema_newUser'

function showNewUserForm() {
    let fields = document.getElementsByClassName('mutable');
    for (let i = 0; i < fields.length; i++) {
        fields[i].className = fields[i].className === 'form__field form__field_visible mutable'
            ? 'form__field form__field_hidden mutable'
            : 'form__field form__field_visible mutable';
    }
}

const Login = () => {
    return (
        <div>
            <Form
                input={[
                    {text: 'login', visible: false, mutable: true},
                    {email: 'email', visible: true, mutable: false},
                    {password: 'password', visible: true, mutable: false},
                    {password: 'repeat password', visible: false, mutable: true}
                ]}
                initialShort={{email: '', password: ''}}
                initialLong={{login: '', email: '', password: '', repeatPassword: ''}}
                validationSchemaShort={validationSchema_login}
                validationSchemaLong={validationSchema_newUser}/>
            <p className='text text_link forForm' onClick={showNewUserForm}>I'm not a user</p>
        </div>

    )
};


export const LoginPage = () => <Card
    render={() => <Login/>}/>;