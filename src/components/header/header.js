import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import './header.css'
import '../text/text_header.css'
import {Button} from "../button/button";
import Menu from "../menu/menu";
import {useAuth} from "../../helpers/auth&route/authContext";
import {logout} from "../../helpers/auth&route/logout";

export default function Header(props) {

    useEffect(() => {
        document.addEventListener('click', changeMenuListener);
        return () => document.removeEventListener('click', changeMenuListener)
    });

    let [menuIsOpen, changeMenuStatus] = useState(false);
    let [menuIsVisible, changeMenuVisible] = useState(false);
    const {setUser} = useAuth();

    let headerClassName = props.className ? 'header ' + props.className : 'header';
    const changeMenuListener = (event) => {
        if (!event.target.closest('.menu') &&  menuIsOpen) {
            changeMenuVisible(false);
            setTimeout(changeMenuStatus, 500, false)
        }
    };

    const buttonOnclick = () => {
        if (menuIsOpen) {
            changeMenuVisible(false);
            setTimeout(changeMenuStatus, 500, false)
        } else {
            changeMenuVisible(true);
            changeMenuStatus(true)
        }
    };

    const logoutFn = () => logout(setUser, changeMenuStatus, false);

    return (
        props.className
            ? <Fragment>
                <div className={headerClassName} data-testid='header'>
                    <p className='text_header'>{props.text}</p>
                    <Button className='button button_menu' onClick={() => buttonOnclick()}/>
                </div>
                {menuIsOpen && <Menu logout={logoutFn} status={menuIsVisible}/>}
            </Fragment>

            : <div className={headerClassName} data-testid='header'>
                <p className='text_header'>{props.text}</p>
            </div>
    )
};

Header.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};