import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function AuthRoute({component: Component, ...rest}) {
    let {authToken} = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (authToken
                           ? <Redirect to="/"/>
                           : <Component {...props} />
                   )}
        />
    )
}