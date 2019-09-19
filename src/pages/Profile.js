import React from 'react';
import '../App.css';
import {Card} from "../components/card/card";
import {Button} from "../components/button/button";

export function Profile() {
    return (
        <div className="App">
            <Card render={() => (<Button text='Hey' className='button'/>)}/>
        </div>
    )
}