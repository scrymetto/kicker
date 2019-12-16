import React, {useState, useEffect, Suspense} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";

import {LoginPage} from "./pages/Login";
import {Rooms} from "./pages/Rooms";
import {RoomById} from "./pages/RoomById";

import {AuthContext} from "./helpers/auth&route/authContext"
import {Popup} from "./components/popup/popup";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/auth&route/privateRoute";
import AuthRoute from "./helpers/auth&route/authRoute";
import {useGlobal} from "./store";

function App(props) {

    const [user, setUser] = useState({
        // auth: undefined
        auth: {
            password: 'ert',
            username: 'ert@ert.ert'
        }
    });

    const [globalState, globalActions] = useGlobal();
    const error = globalState.popup.error;
    const success = globalState.popup.success;
    const className = error ? 'popup popup_error' : success ? 'popup popup_success' : '';
    console.log(globalState)


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
            {error || success
            && <Popup className={className} text={error ? error : success}/>
            }
        </AuthContext.Provider>
    );
}

export default App;