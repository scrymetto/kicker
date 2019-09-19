import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthContext} from "./helpers/authContext"

import "./App.css";

import {LoginPage} from "./pages/Login";
import {Profile} from "./pages/Profile";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/privateRoute";
import AuthRoute from "./helpers/authRoute";

class App extends Component {
    render() {
        return (
            <AuthContext.Provider value={true}>
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
}

export default App;