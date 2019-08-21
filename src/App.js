import React, { Component } from "react";
import "./App.css";
import Card from "./components/card/card";
import Header from "./components/header/header";

class App extends Component{
    render(){
        return(
            <div className="App">
                <Header className='header_main'/>
                <Card/>
            </div>
        );
    }
}

export default App;