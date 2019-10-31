import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import {postRooms} from "../helpers/requests/postRoom";


import {scrollToTop} from "../helpers/scrollToTop";
import {Card} from "../components/card/card";
import {Paper} from "../components/paper/paper";
import {Button} from "../components/button/button";
import {NewRoomFrom} from "../helpers/components/newRoomForm/newRoomForm";

import {StubPaper} from "../components/paper/paper_stub";
import '../components/button/button_new.css'

export function Rooms(props) {

    useEffect(() => {
        setTimeout(() => {
            getRooms(user, getSuccess, onError)
                .then(() => setUploaded(true));
        }, 1000)
    }, []);

    const {user} = useAuth();
    let [isUploaded, setUploaded] = useState(false);

    let [globalState, globalActions] = useGlobal();
    let rooms = globalState.rooms;
    let onError = (e) => globalActions.setErrorState(e);
    let getSuccess = (rooms) => globalActions.addRoomsFromServer(rooms);


    let [isFormVisible, setFormVisible] = useState(false);
    let createNewRoom = () => {
        scrollToTop();
        setFormVisible(true)
    };

    let onSubmitForm = (values) => {
        postRooms(user, values, onError)
            .then(() => {
                getRooms(user, getSuccess, onError)
                    .then(() => setFormVisible(false))
            })
            .catch((e) => onError(e))
    };

    return (
        <Card headerText='Your rooms'
              render={() => (
                  <Fragment>
                      {isFormVisible
                          ? <NewRoomFrom onSubmit={onSubmitForm} setFormVisible={setFormVisible}/>
                          : null}
                      {isUploaded
                          ? rooms.map(room => {
                              let {id, users, name, creatorId} = room;
                              return (
                                  <Link key={id} to={`rooms/${id}`}>
                                      <Paper
                                          players={users}
                                          name={name}
                                          admin={creatorId}/>
                                  </Link>
                              )
                          })
                          : <Fragment>
                              {[1, 2, 3].map((number) => {
                                  return <StubPaper key={number}/>
                              })}
                          </Fragment>}
                      <Button className='button button_new' onClick={createNewRoom}/>
                  </Fragment>
              )}
        />
    )
}