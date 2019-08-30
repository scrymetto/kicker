import React, {Component} from "react";
import "../App.css";
import Card from "../components/card/card";
import {Button} from "../components/button/button";

class Login extends Component {
    render() {
        return (
            <div className="App">
                <Card render={() => (<Button text='Hello' className='button'/>)}
                />
            </div>
        );
    }
}

export default Login;