import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./button.css"
import "./button_back.css"

export default class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let text = this.props.className === 'button button_back'
            ? '←'
            : this.props.text;

        return (
            <button className={this.props.className}>{text}</button>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
};