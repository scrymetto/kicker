import React, {useState} from "react";
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import './popup.css';
import '../text/text.css';
import {Button} from "../button/button";

export const Popup = ({text, className}) => {
    let [inProp, setInProp] = useState(true);
    let timer = setTimeout(setInProp, 5000, false);

    let closePopup = () => {
        clearTimeout(timer);
        setInProp(false)
    };
    return (
        <CSSTransition timeout={300} classNames='popup' in={inProp} appear={true}>
            <div className={className}>
                <p className='text'>{text}</p>
                <Button className='button button_close' onClick={closePopup}/>
            </div>
        </CSSTransition>
    )
};

Popup.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.oneOf(['popup_success', 'popup_error']).isRequired //different classNames = different colors
};