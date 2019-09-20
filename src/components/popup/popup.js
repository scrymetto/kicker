import React, {useState} from "react";
import './popup.css';
import '../text/text.css';
import {Button} from "../button/button";

export const Popup = ({text, onclick, textForButton}) => {
    return (
        <div className='popup'>
            <div className='popup popup_inner'>
                <p className='text'>{text}</p>
                <Button className='button' text={textForButton} onClick={onclick}/>
            </div>
        </div>
    )
};