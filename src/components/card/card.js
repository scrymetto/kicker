import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./card.css"
import Header from "../header/header";
import {Button} from "../button/button";

export function Card ({headerText, render, button_back, ...props}) {
    return (
        <div className='card'>
            <Header text={headerText}/>
            {render()}
        </div>
    )
}

Card.propTypes = {
    headerText: PropTypes.string,
    render: PropTypes.func.isRequired,
};

