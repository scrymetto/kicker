import React, {Fragment, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import {postRooms} from "../helpers/requests/postRoom";
import {deleteRoom} from "../helpers/requests/deleteRoom";
import {scrollToTop} from "../helpers/scrollToTop";

import {Card} from "../components/card/card";
import {Paper} from "../components/paper/paper";
import {Button} from "../components/button/button";
import {Form_simple} from "../components/form/form_simple/_simple";
import {StubPaper} from "../components/paper/paper_stub";
import {validationSchema_newRoom} from "../components/form/__validationSchema/form__validationSchema_newRoom";

//TODO: change height of card if <NewRoomForm/> is open!

export function Rooms(props) {

    const {user} = useAuth();
    const [isUploaded, setUploaded] = useState({loading: true, error: false, done: false});
    const [redirect, doRedirect] = useState(false);

    useEffect(() => {
            getRooms(user, getSuccess, onError);
            props.history.push(props.history.location);
        },[]);

    const [globalState, globalActions] = useGlobal();
    const rooms = globalState.rooms;
    const onError = (e) => {
        globalActions.setPopup({error: e});
        setUploaded({loading: false, error: true, done: false})
    };
    const getSuccess = (rooms) => {
        globalActions.addStateFromServer(rooms, 'rooms');
        setUploaded({loading: false, error: false, done: true})
    };

    const [isFormVisible, setFormVisible] = useState(false);

    const createNewRoomForm = () => {
        scrollToTop();
        setFormVisible(true);
    };

    const onSubmitForm = (values) => {
        postRooms(user, values, onError)
            .then((data) => {
                globalActions.addNewInState(data, 'rooms');
                doRedirect(data.id)
            })
            .then(() => {
                globalActions.setPopup({success: 'Success! Let\'s add new players!'});
            })
            .catch((e) => onError(e))
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    const deleteRoomFromState = id => {
        deleteRoom(user, id, onError)
            .then(() => {
                globalActions.deleteFromState(id, 'rooms')
            })
            .then(() => globalActions.setPopup({success: '♻ The room has been deleted!'}));

    };

    return (
        <Card headerText='Your rooms'
              render={() => (
                  <Fragment>
                      {redirect && <Redirect to={`rooms/${redirect}`}/>}
                      {isFormVisible
                          ? <Form_simple onSubmit={onSubmitForm}
                                         close={closeForm}
                                         initial={{name:''}}
                                         input={'name'}
                                         validationSchema={validationSchema_newRoom}
                          />
                          :
                          !isUploaded.error &&
                          <CSSTransition timeout={300} classNames='button_animation' in={!isFormVisible} appear={true}>
                              <Button className='button button_new' onClick={createNewRoomForm}/>
                          </CSSTransition>}
                      {isUploaded.done && rooms.map(room => {
                          const {id, users, name} = room;
                          const creator = room.creator;
                          return <div key={id} style={{position: 'relative'}}>
                              <Link to={`rooms/${id}`}>
                                  <Paper
                                      className='paper'
                                      id={id}
                                      players={users}
                                      name={name}
                                      admin={creator.nickname || creator.id}
                                      remove={(id) => deleteRoomFromState(id)}/>
                              </Link>
                              <Button className='button button_close'
                                      onClick={() => deleteRoomFromState(id)}
                                      style={{position: 'absolute', top: '10px', right: '10px'}}
                              />
                          </div>
                      })}
                      {isUploaded.done && !rooms[0] &&
                      <div className='margin_15'><p className='text'>
                          You don't have any room. Let's create the very first one!</p></div>}
                      {isUploaded.loading && <Fragment>
                          {[1, 2, 3].map((number) => {
                              return <StubPaper key={number}/>
                          })}
                      </Fragment>}
                      {isUploaded.error &&
                      <div className='margin_15'><p className='text text_error' style={{fontSize: '1em'}}>Sorry, the
                          server doesn't work. Please, try again later.</p></div>}
                  </Fragment>
              )}
        />
    )
}