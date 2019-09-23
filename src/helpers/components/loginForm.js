import React, {Fragment, useState} from "react";
import {useAuth} from "../auth&route/authContext";
import {submitForm} from "../submitForm";
import {Form} from "../../components/form/form";
import {validationSchema_login} from "../../components/form/__validationSchema/form__validationSchema_login";

export const Login = ({className}) => {
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