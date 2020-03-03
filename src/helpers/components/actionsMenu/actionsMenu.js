import React, {useCallback, useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../../../store";
import {useAuth} from "../../auth&route/authContext";
import {form_validationSchema_newPlayer} from "../../../components/form/__validationSchema/form_validationSchema_newPlayer";
import {postPlayer} from "../../requests/postPlayer";
import {setErrorPopup} from "../../setErrorPopup";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Form_simple} from "../../../components/form/form_simple/_simple";
import {Overlay} from "../../../components/overlay/overlay";
import {Point} from "./actionMenu_point";


import './actionsMenu.css'
import '../../../components/container/absolute.css';

const initial = {name: ''};
const style = {width: '100%', margin: '0'};


const ActionsMenu = ({room, closeMenu}) => {

    const globalActions = useGlobal()[1];

    const {user} = useAuth();

    const [players, setPlayers] = useState([]);

    const [form, openForm] = useState(false);
    const [visible, setVisible] = useState(true);

    const addNewPlayer = useCallback(name => {
        postPlayer(user, room.id, name.name)
            .then((data) => {
                setPlayers(data.players)
            })
            .catch(e => {
                setErrorPopup(e, globalActions.setPopup)
            })
    }, []);

    const goBack = useCallback(() => {
        let actionsState = {};
        actionsState.players = players[0] ? players : null;
        closeMenu(actionsState)
    }, [closeMenu]);

    return <>
        <Overlay visible={visible}/>
        <CSSTransition timeout={300}
                       classNames='actionsMenu'
                       in={visible}
                       appear={true}
                       onExited={goBack}
        >
            <div className='container absolute'>
                <Card headerText={`Actions for ${room.name}`}
                      style={style}
                      render={() => {
                          return <>
                              {form && <Form_simple
                                  initial={initial}
                                  input='name'
                                  onSubmit={addNewPlayer}
                                  close={() => openForm(false)}
                                  validationSchema={form_validationSchema_newPlayer}
                              />}
                              {!form && <Point
                                  onClick={() => openForm(true)}
                                  text='Add new player'
                                  hint='Play with all your friends!'
                                  emoji='&#128111;'
                              />}
                              {!form && <Point
                                  onClick={() => console.log('open')}
                                  text='Remove a player'
                                  // hint='Only you can choose your comrades!'
                                  hint='Coming soon.. '
                                  emoji='&#128128;'
                              />}
                              {!form && <Point
                                  onClick={() => console.log('open')}
                                  text='Delete this room'
                                  // hint='Only you can choose your comrades!'
                                  hint='Coming soon.. '
                                  emoji="&#128163;"
                              />}
                              {!form && <Button
                                  className='button button_back'
                                  onClick={() => setVisible(false)}/>}
                          </>
                      }}/>
            </div>
        </CSSTransition>
    </>
};
export default ActionsMenu;