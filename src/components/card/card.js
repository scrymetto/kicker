import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./card.css"
import Header from "../header/header";
import {Button} from "../button/button";

function Card(props) {
    return (
        <div className='card'>
            <Header text='header'/>
            {props.render()}
            <Button className='button button_back'/>
        </div>
    )
}

Card.propTypes = {
    render: PropTypes.func
};

export default Card;