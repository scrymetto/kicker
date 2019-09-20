import React, {useState} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthContext} from "./helpers/auth&route/authContext"

import "./App.css";

import {LoginPage} from "./pages/Login";
import {Profile} from "./pages/Profile";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/auth&route/privateRoute";
import AuthRoute from "./helpers/auth&route/authRoute";

function App(props) {

    const [authTokens, setAuthTokens] = useState();

    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data)
    };

    return (
        <AuthContext.Provider value={/*{authTokens, setAuthTokens: setTokens}*/ false}>
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