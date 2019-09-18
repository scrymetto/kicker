import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./card.css"
import Header from "../header/header";
import {Button} from "../button/button";

export function Card (props) {
    return (
        <div className='card'>
            <Header text='header'/>
            {props.render()}
            {props.button_back && <Button className='button button_back'/>}
        </div>
    )
}

Card.propTypes = {
    render: PropTypes.func,
    button_back: PropTypes.bool
};

