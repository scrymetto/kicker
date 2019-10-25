import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";

import {AuthContext} from "./helpers/auth&route/authContext"
import {LoginPage} from "./pages/Login";
import {Rooms} from "./pages/Rooms";
import {RoomById} from "./pages/RoomById";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/auth&route/privateRoute";
import AuthRoute from "./helpers/auth&route/authRoute";

function App (props) {

    const [user, setUser] = useState({
        // auth: undefined
        auth: {
            password: 'qwe',
            username: 'qwe@qwe.qwe'
        }
    });
    // console.log(user)

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
                    <AuthRoute path="/login" component={LoginPage}/>
                    <PrivateRoute exact path="/" component={Rooms}/>
                    <PrivateRoute path={`/rooms/:roomId`} component={RoomById}/>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;