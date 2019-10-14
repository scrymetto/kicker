import React from 'react';
import {useAuth} from "../../helpers/auth&route/authContext";
import PropTypes from "prop-types";
import './menu.css'
import '../text/text_menu.css'

function Menu(props) {
    let {logout, className} = props;
    let {user} = useAuth();
    let fullClassName = 'menu ' + className;
    return (
        user.login ? (<ul className={fullClassName}>
                <li><p className='text text_menu'>Settings</p></li>
                <li><p className='text text_menu' onClick={logout}>Logout</p></li>
            </ul>)
            : (<ul className={fullClassName}>
                <li><p className='text text_menu'>Github repo</p></li>
            </ul>)
    )
}

Menu.propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func
};

export default Menu;