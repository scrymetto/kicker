import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {LoginPage} from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./helpers/privateRoute";
import {AuthContext} from "./helpers/authContext"
import Header from "./components/header/header";

class App extends Component {
    render() {
        return (
            <AuthContext.Provider value={false}>
                <Header className="header_main" text="Let's play kicker!"/>
                <Router>
                    <div className="App">
                        <Route exact path="/" component={LoginPage}/>
                        <PrivateRoute path="/profile" component={Profile}/>
                    </div>
                </Router>
            </AuthContext.Provider>
        );
    }
}

export default App;