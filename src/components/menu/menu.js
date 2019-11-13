import React, {useState} from 'react';
import {useAuth} from "../../helpers/auth&route/authContext";
import PropTypes from "prop-types";
import './menu.css'
import '../text/text_menu.css'
import {CSSTransition} from "react-transition-group";

function Menu(props) {
    let {logout, status} = props;
    let {user} = useAuth();
    let inProp = status === 'open';
    // let [inProp, changeInProp] = useState(true);
    return (
            <CSSTransition in={inProp} timeout={300} classNames='menu'>
                {user.auth
                    ?<ul className='menu' test='menu'>
                        <li><p className='text text_menu'>Settings</p></li>
                        <li><p className='text text_menu' onClick={logout}>Logout</p></li>
                    </ul>
                    :<ul className='menu' test='menu' test='menu'>
                        <li><p className='text text_menu'>Github repo</p></li>
                    </ul>
                }
            </CSSTransition>
    )
}

Menu.propTypes = {
    className: PropTypes.string,
    logout: PropTypes.func
};

export default Menu;