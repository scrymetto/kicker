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
    let {setUser} = useAuth();

    let headerClassName = props.className ? 'header ' + props.className : 'header';
    let changeMenuListener = (event) => {
        if (!event.target.closest('.menu') && (!event.target.closest('.button_menu')) && menuIsOpen) {
            changeMenuStatus(!menuIsOpen);
        }
    };
    let status = menuIsOpen ? 'open' : 'close';

    let logoutFn = () => logout(setUser, changeMenuStatus, false);

    return (
        props.className
            ? <Fragment>
                <div className={headerClassName} data-testid='header'>
                    <p className='text_header'>{props.text}</p>
                    <Button className='button button_menu' onClick={() => changeMenuStatus(!menuIsOpen)}/>
                </div>
                    <Menu status={status} logout={logoutFn}/>
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