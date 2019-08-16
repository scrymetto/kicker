import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className={this.props.className}>{this.props.text}</button>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
};