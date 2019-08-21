import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './header.css'
import Button from "../button/button";
import Menu from "../menu/menu";

export default function Header(props) {

    let [menuStatus, changeMenuStatus] = useState(false);

    let menuClassName = menuStatus ? 'menu menu_open' : 'menu menu_close';
    let headerClassName = props.className ? 'header ' + props.className : 'header';
    return (
        props.className ? (
            <div className={headerClassName}>
                <p>{props.text}</p>
                <Button className='button button_menu' onClick={()=>changeMenuStatus(!menuStatus)}/>
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