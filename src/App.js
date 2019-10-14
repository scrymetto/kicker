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

    const [user, setUser] = useState({email: undefined, password: undefined});
    console.log(user)

    // useEffect(()=>{
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         setAuthToken(token);
    //     }
    // });

    // const setToken = (loginAndPassword) => {
    //     // localStorage.setItem("token", JSON.stringify(data));
    //     setUser(loginAndPassword);
    // };

    return (
        <AuthContext.Provider value={{user, setUser}}>
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