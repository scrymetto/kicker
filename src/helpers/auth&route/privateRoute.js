import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from "./authContext";

export default function PrivateRoute({component: Component, ...rest}) {
    let {user} = useAuth();
    return (
        <Route {...rest}
               render={(props) =>
                   (user.email
                           ? <Component {...props} />
                           : <Redirect to="/login"/>
                   )}
        />
    )
}