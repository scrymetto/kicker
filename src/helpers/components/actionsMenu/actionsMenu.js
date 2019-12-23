import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../../../store";
import {useAuth} from "../../auth&route/authContext";
import {postPlayer} from "../../requests/postPlayer";
import {validationSchema_newPlayer} from "../../../components/form/__validationSchema/validationSchema_newPlayer";


import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Form_simple} from "../../../components/form/form_simple/_simple";
import {Overlay} from "../../../components/overlay/overlay";
import {Point} from "./actionMenu_point";


import './actionsMenu.css'
import '../../../components/container/absolute.css';

const ActionsMenu = ({room, closeMenu}) => {

    const [globalState, globalActions] = useGlobal();

    const {user} = useAuth();

    const onError = (e) => globalActions.setPopup({error: e});

    const [newUsers, setNewUsers] = useState([]);

    const [form, openForm] = useState(false);
    const [visible, setVisible] = useState(true);

    const addNewPlayer = name => {
        postPlayer(user, room.id, name.name, onError)
            .then((data)=>{
                const newUser = data.players[data.players.length-1];
                setNewUsers((prev)=> [...prev, newUser])
            })
    };

    const goBack = ()=> {
        let actionsState = {};
        actionsState.newUsers = newUsers ? newUsers : null;
        closeMenu(actionsState)
    };

    return <Fragment>
        <Overlay visible={visible}/>
        <CSSTransition timeout={300}
                       classNames='actionsMenu'
                       in={visible}
                       appear={true}
                       onExited={goBack}
        >
            <div className='container absolute'>
                <Card headerText={`Actions for ${room.name}`}
                      style={{width: '100%', margin: '0'}}
                      render={() => {
                          return <Fragment>
                              {form && <Form_simple
                                  initial={{name: ''}}
                                  input='name'
                                  onSubmit={addNewPlayer}
                                  close={() => openForm(false)}
                                  validationSchema={validationSchema_newPlayer}
                              />}
                              {!form && <Point
                                  onClick={() => openForm(true)}
                                  text='Add new player'
                                  hint='Play with all your friends!'
                                  emoji='&#128111;'
                              />}
                              {!form && <Point
                                  onClick={console.log('open')}
                                  text='Remove a player'
                                  hint='Only you can choose your comrades!'
                                  emoji='&#128128;'
                              />}
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