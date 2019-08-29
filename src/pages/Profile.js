import React, {Component} from 'react';
import '../App.css';
import Header from "../components/header/header";
import Card from "../components/card/card";

export default function Profile() {
    return (
        <div className="App">
            <Header className="header_main" text="Hello"/>
            <Card/>
        </div>
    )
}