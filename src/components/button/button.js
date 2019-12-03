import React from 'react';
import PropTypes from 'prop-types';
import "./button.css"
import "./button_back.css"
import "./button_menu.css"
import "./button_close.css"
import "./button_new.css"
import "./button_next.css"

export function Button({text, className, ...props}) {

    const content = text ? text : '';

    return (
        <button className={className} onClick={props.onClick} {...props}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};