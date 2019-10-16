import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function PrivateRoute({component: Component, ...rest}) {
    const {user} = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (user.auth
                           ? <Component {...props} />
                           : <Redirect to="/login"/>
                   )}
        />
    )
}