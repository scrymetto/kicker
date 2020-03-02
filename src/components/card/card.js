import React from 'react';
import PropTypes from 'prop-types';
import "./card.css"
import Header from "../header/header";

export function Card ({headerText, render, button_back, ...props}) {
    return (
        <div className='card' {...props}>
            <Header text={headerText}/>
            {render()}
        </div>
    )
}

Card.propTypes = {
    headerText: PropTypes.string,
    render: PropTypes.func.isRequired,
};

