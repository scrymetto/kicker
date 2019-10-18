import React, {Fragment, useState} from "react";
import {useAuth} from "../auth&route/authContext";
import {submitNewUserForm} from "../requests/submitNewUserForm";
import {Form} from "../../components/form/form";
import {validationSchema_login} from "../../components/form/__validationSchema/form__validationSchema_login";
import {Popup} from "../../components/popup/popup";
import {prepareDataForRequest} from "../requests/prepareDataForRequest";
import {getRooms} from "../requests/getRooms";

export const Login = ({className}) => {
    let template = ['email', 'password'];
    let [error, setError] = useState(false);
    let {setUser} = useAuth();
    let onError = (e) => {
        setError(e)
    };
    let onSuccess = (user) => {
        setUser({auth: user})
    };
    let onSubmit = (values) => {
        let data = prepareDataForRequest(template, values);
        getRooms(data, onSuccess, onError);
    };

    return (<Fragment>
            <Form className={className}
                  input={[{email: 'email'}, {password: 'password'}]}
                  initial={{email: '', password: ''}}
                  validationSchema={validationSchema_login}
                  onSubmit={(values) => onSubmit(values)}
            />
            {error
                ? <Popup className='popup popup_error' text={error}/>
                : null}
        </Fragment>
    )
};