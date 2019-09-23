import React, {Fragment, useState} from "react";
import {submitForm} from "../submitForm";
import {Form} from "../../components/form/form";
import {validationSchema_newUser} from "../../components/form/__validationSchema/form__validationSchema_newUser";

export const NewUserForm = ({className, endRegistration}) => {
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