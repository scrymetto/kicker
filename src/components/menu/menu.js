import React from 'react';
import PropTypes from "prop-types";
import './menu.css'

function Menu(props) {
    let login = 'Vasya';
    let fullClassName = 'menu ' + props.className;
    return (
        login ? (<ul className={fullClassName}>
                <li><p className='text text_menu'>Settings</p></li>
                <li><p className='text text_menu'>Logout</p></li>
            </ul>)
            : (<ul className={fullClassName}>
                <li><p className='text text_menu'>Login</p></li>
            </ul>)
    )
}

Menu.propTypes = {
    className: PropTypes.string
};

export default Menu;