import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import {useGlobal} from "../../store";
import {Button} from "../button/button";
import '../text/text.css';
import './popup.css';

export const Popup = ({text, className}) => {
    const globalActions = useGlobal()[1];
    const [inProp, setInProp] = useState(true);
    let timer;

    useEffect(() => {
        timer = setTimeout(setInProp, 5000, false);
        return () => clearTimeout(timer);
    });

    const closePopup = () => {
        clearTimeout(timer);
        setInProp(false);
    };

    const setState = () => globalActions.setPopup({});

    return (
        <CSSTransition timeout={300} classNames='popup' in={inProp} appear onExited={setState} unmountOnExit>
            <div className={className}>
                <p className='text'>{text}</p>
                <Button className='button button_close' onClick={closePopup}/>
            </div>
        </CSSTransition>
    )
};

Popup.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.oneOf(['popup popup_success', 'popup popup_error']).isRequired //different classNames = different colors
};