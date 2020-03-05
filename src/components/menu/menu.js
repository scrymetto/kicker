import React, {forwardRef, Fragment} from 'react';
import PropTypes from "prop-types";
import './menu.css'
import '../text/text_menu.css'
import {CSSTransition} from "react-transition-group";

const Menu = forwardRef((props, ref) => (
    <CSSTransition in={props.display} timeout={300} classNames='menu' appear unmountOnExit>
        {props.user
            ? <ul className='menu' data-testid='menu' ref={ref}>
                {/*<li><p className='text text_menu'>Settings</p></li>*/}
                <li><p className='text text_menu' onClick={props.logout}>Logout</p></li>
            </ul>
            : <ul className='menu' data-testid='menu' ref = {ref}>
                <li><a href='https://github.com/scrymetto/kicker' className='text text_menu'>Github repo</a></li>
                <li><a href='https://gitlab.com/scrymetto/kicker' className='text text_menu'>Gitlab repo</a></li>
            </ul>
        }
    </CSSTransition>
));

Menu.propTypes = {
    display: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
};

export default Menu;