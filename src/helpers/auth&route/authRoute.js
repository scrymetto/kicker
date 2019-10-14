import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function AuthRoute({component: Component, ...rest}) {
    const {user} = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (user.login
                           ? <Redirect to="/"/>
                           : <Component {...props} />
                   )}
        />
    )
}