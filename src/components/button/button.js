import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./button.css"
import "./button_back.css"
import "./button_menu.css"

export function Button (props) {
        let text = props.text;

        switch (props.className) {
            case 'button button_back':
                text = '←';
                break;
            case 'button button_menu':
                text = '≡';
                break;
            default:
                text = props.text;
        }

        return (
            <button className={props.className} onClick={props.onClick}>{text}</button>
        )
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};