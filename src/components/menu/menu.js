import React from 'react';
import PropTypes from "prop-types";
import './menu.css'
import {useAuth} from "../../helpers/auth&route/authContext";

function Menu(props) {
    let login = useAuth();
    let fullClassName = 'menu ' + props.className;
    return (
        login ? (<ul className={fullClassName}>
                <li><p>Settings</p></li>
                <li><p>Logout</p></li>
            </ul>)
            : (<ul className={fullClassName}>
                <li><p>Login</p></li>
            </ul>)
    )
}

Menu.propTypes = {
    className: PropTypes.string
};

export default Menu;