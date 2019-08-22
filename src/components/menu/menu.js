import React from 'react';
import PropTypes from "prop-types";
import './menu.css'

function Menu (props) {
    let login = 'Vasya';
    let fullClassName = 'menu ' + props.className;
    return (
        login ? (<div className={fullClassName}>
                <p className='text text_menu'>Settings</p>
                <p className='text text_menu'>Logout</p>
            </div>)
            : (<div className={fullClassName}>
                <p className='text text_menu'>Login</p>
            </div>)
    )
}

Menu.propTypes = {
    className: PropTypes.string
};

export default Menu;