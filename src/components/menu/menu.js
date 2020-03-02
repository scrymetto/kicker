import React from 'react';
import {useAuth} from "../../helpers/auth&route/authContext";
import PropTypes from "prop-types";
import './menu.css'
import '../text/text_menu.css'
import {CSSTransition} from "react-transition-group";

function Menu(props) {
    let {logout, display} = props;
    let {user} = useAuth();

    return (
            <CSSTransition in={display} timeout={300} classNames='menu' appear unmountOnExit>
                {user.auth
                    ?<ul className='menu' data-testid='menu'>
                        {/*<li><p className='text text_menu'>Settings</p></li>*/}
                        <li><p className='text text_menu' onClick={logout}>Logout</p></li>
                    </ul>
                    :<ul className='menu' data-testid='menu'>
                        <li><a href='https://github.com/scrymetto/kicker' className='text text_menu'>Github repo</a></li>
                        <li><a href='https://gitlab.com/scrymetto/kicker' className='text text_menu'>Gitlab repo</a></li>
                    </ul>
                }
            </CSSTransition>
    )
}

Menu.propTypes = {
    status: PropTypes.bool,
    logout: PropTypes.func
};

export default Menu;