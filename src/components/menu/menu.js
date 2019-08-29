import React from 'react';
import PropTypes from "prop-types";
import './menu.css'
import {useAuth} from "../../helpers/authContext";

function Menu(props) {
    let login = useAuth();
    let fullClassName = 'menu ' + props.className;
    console.log (login);
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