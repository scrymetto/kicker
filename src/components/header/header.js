import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './header.css'
import Button from "../button/button";
import Menu from "../menu/menu";

export default function Header(props) {
    let [menuIsOpen, changeMenuStatus] = useState(false);

    let menuClassName = 'menu ' + !menuIsOpen ? 'menu_open' : 'menu_close';
    let headerClassName = props.className ? 'header ' + props.className : 'header';
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu') && (!event.target.closest('.button_menu')) && menuIsOpen) {
            changeMenuStatus(!menuIsOpen)
        }
    });
    return (
        props.className ? (
            <div className={headerClassName}>
                <p>{props.text}</p>
                <Button className='button button_menu' onClick={() => changeMenuStatus(!menuIsOpen)}/>
                <Menu className={menuClassName}/>
            </div>
        ) : (
            <div className={headerClassName}>
                <p>{props.text}</p>
            </div>
        )
    )
};

Header.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};