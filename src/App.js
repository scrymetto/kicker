import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                </div>
            </Router>
        );
    }
}

export default App;