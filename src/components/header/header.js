import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import './header.css'
import '../text/text_header.css'
import {Button} from "../button/button";
import Menu from "../menu/menu";
import {useAuth} from "../../helpers/auth&route/authContext";
import {logout} from "../../helpers/auth&route/logout";

export default function Header(props) {

    if (props.className) {
        useEffect(() => {
            document.addEventListener('click', changeMenuListener);
            return () => document.removeEventListener('click', changeMenuListener)
        });

        const [menuIsOpen, changeMenuStatus] = useState(false);
        const [menuIsVisible, changeMenuVisible] = useState(false);
        const {setUser} = useAuth();
        const headerClassName = 'header ' + props.className;
        const changeMenuListener = (event) => {
            if (!event.target.closest('.menu') && menuIsOpen) {
                changeMenuVisible(false);
                setTimeout(changeMenuStatus, 400, false)
            }
        };

        const buttonOnclick = () => {
            if (menuIsOpen) {
                changeMenuVisible(false);
                setTimeout(changeMenuStatus, 400, false)
            } else {
                changeMenuStatus(true);
                changeMenuVisible(true);
            }
        };

        const logoutFn = () => logout(setUser, changeMenuStatus, false);
        return <Fragment>
            <div className={headerClassName} data-testid='header'>
                <p className='text_header_main'>{props.text}</p>
                <Button className='button button_menu' onClick={() => buttonOnclick()}/>
            </div>
            {menuIsOpen && <Menu logout={logoutFn} status={menuIsVisible}/>}
        </Fragment>
    } else {

        const headerClassName = 'header';
        return <div className={headerClassName} data-testid='header'>
            <p className='text_header'>{props.text}</p>
        </div>
    }
};

Header.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};