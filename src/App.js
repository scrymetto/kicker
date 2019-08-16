import React, { Component } from "react";
import "./App.css";
import Card from "./components/card/card";

class App extends Component{
    render(){
        return(
            <div className="App">
                <Card/>
            </div>
        );
    }
}

export default App;