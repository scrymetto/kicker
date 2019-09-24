import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function PrivateRoute({component: Component, ...rest}) {
    let {authToken} = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (authToken
                           ? <Component {...props} />
                           : <Redirect to="/login"/>
                   )}
        />
    )
}