import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function AuthRoute({component: Component, ...rest}) {
    let isAuthenticated = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (!isAuthenticated
                           ? <Component {...props} />
                           : <Redirect to="/"/>
                   )}
        />
    )
}