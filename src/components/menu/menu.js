import React from 'react';
import {useAuth} from "../../helpers/auth&route/authContext";
import PropTypes from "prop-types";
import './menu.css'
import '../text/text_menu.css'
import {CSSTransition} from "react-transition-group";

function Menu(props) {
    let {logout, status} = props;
    let {user} = useAuth();

    return (
            <CSSTransition in={status} timeout={300} classNames='menu' appear={true}>
                {user.auth
                    ?<ul className='menu' data-testid='menu'>
                        <li><p className='text text_menu'>Settings</p></li>
                        <li><p className='text text_menu' onClick={logout}>Logout</p></li>
                    </ul>
                    :<ul className='menu' data-testid='menu'>
                        <li><p className='text text_menu'>Github repo</p></li>
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