import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./button.css"
import "./button_back.css"
import "./button_menu.css"
import "./button_close.css"

export function Button ({text, className, ...props}) {

        switch (className) {
            case 'button button_back':
                text = '←';
                break;
            case 'button button_menu':
                text = '≡';
                break;
            case 'button button_close':
                text = '+';
                break
        }

        return (
            <button className={className} onClick={props.onClick} {...props}>{text}</button>
        )
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};