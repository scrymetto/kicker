import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./card.css"
import Header from "../header/header";
import Button from "../button/button";

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <Header text='header'/>
                <Button className='button button_back'/>
                <Button text='button' className='button'/>
            </div>
        )
    }
}

// Test.propTypes = {
//     text: PropTypes.string
// };

export default Card;