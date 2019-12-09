import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import './popup.css';
import '../text/text.css';
import {Button} from "../button/button";
import {useGlobal} from "../../store";

export const Popup = ({text, className}) => {

    useEffect(() => {
        return () => {
            clearTimeout(timer);
            setInProp(false);
            setTimeout(globalActions.setPopup, 300, {});
        }
    });
    const [globalState, globalActions] = useGlobal();
    const [inProp, setInProp] = useState(true);
    const timer = setTimeout(setInProp, 5000, false);
    const closePopup = () => {
        clearTimeout(timer);
        setInProp(false);
        setTimeout(globalActions.setPopup, 300, {});
    };
    return (
        <CSSTransition timeout={300} classNames='popup' in={inProp} appear unmountOnExit>
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