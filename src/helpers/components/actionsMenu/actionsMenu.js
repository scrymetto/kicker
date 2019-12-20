import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Form_simple} from "../../../components/form/form_simple/_simple";
import {Overlay} from "../../../components/overlay/overlay";
import {Point1} from "./actionMenu_point1";

import {useGlobal} from "../../../store";
import {useAuth} from "../../auth&route/authContext";
import {validationSchema_newPlayer} from "../../../components/form/__validationSchema/validationSchema_newPlayer";
import {postPlayer} from "../../requests/postPlayer";

import './actionsMenu.css'
import '../../../components/container/absolute.css';

const ActionsMenu = ({room, addNewPlayer, closeMenu}) => {

    const [globalState, globalActions] = useGlobal();

    const {user} = useAuth();

    const [form, openForm] = useState(false);
    const [visible, setVisible] = useState(true);

    const onSubmit = (name) =>{
      addNewPlayer(name)
    };

    return <Fragment>
        <Overlay visible={visible}/>
        <CSSTransition timeout={300}
                       classNames='actionsMenu'
                       in={visible}
                       appear={true}
                       onExited={closeMenu}
        >
            <div className='container absolute'>
                <Card headerText={`Actions for ${room.name}`}
                      style={{width: '100%', margin: '0'}}
                      render={() => {
                          return <Fragment>
                              {form && <Form_simple
                                  initial={{name: ''}}
                                  input='name'
                                  onSubmit={onSubmit}
                                  close={() => openForm(false)}
                                  validationSchema={validationSchema_newPlayer}
                              />}
                              {!form && <Point1 onClick={() => openForm(true)}/>}
                              {!form && <Button
                                  className='button button_back'
                                  onClick={() => setVisible(false)}/>}
                          </Fragment>
                      }}/>
            </div>
        </CSSTransition>
    </Fragment>
};
export default ActionsMenu;