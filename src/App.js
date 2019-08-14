import React, { Component } from "react";
import "./App.css";
import Test from "./components/card/card"

class App extends Component{
    render(){
        return(
            <div className="App">
                <Test text="one"></Test>
            </div>
        );
    }
}

export default App;