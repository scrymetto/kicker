import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import {Card} from "../components/card/card";
import {Paper} from "../components/paper/paper";
import {Button} from "../components/button/button";
import {NewRoomFrom} from "../helpers/components/newRoomForm";

import '../components/button/button_new.css'
import {postRooms} from "../helpers/requests/postRoom";

export function Rooms(props) {

    useEffect(() => {
        getRooms(user, getSuccess, onError)
            .then(() => setUploaded(true));
    }, []);

    const {user} = useAuth();

    let [globalState, globalActions] = useGlobal();
    let rooms = globalState.rooms;

    let [isUploaded, setUploaded] = useState(false);
    let [isFormVisible, setFormVisible] = useState(false);

    let onError = (e) => console.dir(e)
    let getSuccess = (rooms) => {
        globalActions.addRoomsFromServer(rooms);
    };


    let createNewRoom = () => {
        setFormVisible(true)
    };

    let onSubmitForm = (values) => {
        postRooms(user, values, onError)
            .then((answer) => {
                answer
                    ? getRooms(user, getSuccess, onError)
                    : onError('error')
            })
            .then(() => setFormVisible(false));
    };

    return (
        <Card headerText='Your rooms'
              render={() => (
                  <div>
                      {isFormVisible
                          ? <Fragment>
                              <NewRoomFrom onSubmit={onSubmitForm}/>
                              <Button
                                  className='button button_back'
                                  onClick={() => {
                                      setFormVisible(false)
                                  }}/>
                          </Fragment>
                          : null}
                      {isUploaded
                          ? rooms.map(room => {
                              return (
                                  <Link key={room.id} to={`rooms/${room.id}`}>
                                      <Paper
                                          players={room.users}
                                          name={room.name}
                                          admin={room.creatorId}/>
                                  </Link>
                              )
                          })
                          : null}
                      <Button className='button button_new' onClick={createNewRoom}/>
                  </div>
              )}
        />
    )
}