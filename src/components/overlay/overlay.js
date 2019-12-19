import React from 'react';
import {CSSTransition} from "react-transition-group";
import './overlay.css'

export const Overlay = ({visible}) => {

    return <CSSTransition in={visible}
                          classNames='overlay'
                          timeout={300}
                          appear
                          unmountOnExit
    >
        <div className='overlay'/>
    </CSSTransition>
};