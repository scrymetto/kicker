import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";

import {AuthContext} from "./helpers/auth&route/authContext"
import {LoginPage} from "./pages/Login";
import {Profile} from "./pages/Profile";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/auth&route/privateRoute";
import AuthRoute from "./helpers/auth&route/authRoute";

function App (props) {

    const [authToken, setAuthToken] = useState();

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }
    });

    const setToken = (data) => {
        localStorage.setItem("token", JSON.stringify(data));
        setAuthToken(data);
    };

    return (
        <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
            <Header className="header_main" text="Let's play kicker!"/>
            <Router>
                <div className="App">
                    <AuthRoute exact path="/login" component={LoginPage}/>
                    <PrivateRoute path="/" component={Profile}/>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;