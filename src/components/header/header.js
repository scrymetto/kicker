import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return <div className='header'>
            {this.props.text}
        </div>
    }
};

Header.propTypes = {
    text: PropTypes.string
};