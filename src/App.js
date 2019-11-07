import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";

import {Rooms} from "./pages/Rooms";
import {RoomById} from "./pages/RoomById";

import {AuthContext} from "./helpers/auth&route/authContext"
import {LoginPage} from "./pages/Login";
import {Popup} from "./components/popup/popup";
import Header from "./components/header/header";
import PrivateRoute from "./helpers/auth&route/privateRoute";
import AuthRoute from "./helpers/auth&route/authRoute";
import {useGlobal} from "./store";

function App(props) {

    const [user, setUser] = useState({
        // auth: undefined
        auth: {
            password: 'asd',
            username: 'asd@asd.asd'
        }
    });

    let [globalState, globalActions] = useGlobal();
    let error = globalState.popup.error;
    let success = globalState.popup.success;
    let className = error ? 'popup popup_error' : success ? 'popup popup_success' : '';
    // console.log('error state '+error)


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
                ? <Popup className={className} text={error ? error : success}/>
                : null}
        </AuthContext.Provider>
    );
}

export default App;