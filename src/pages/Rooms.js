import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import '../App.css';
import {Card} from "../components/card/card";
import {Paper} from "../components/paper/paper";
import {Button} from "../components/button/button";

export function Rooms(props) {

    useEffect(() => {
        getRooms(user, onSuccess, onError)
            .then(() => setUploaded(true));
    }, []);
    let [isUploaded, setUploaded] = useState(false);
    let [globalState, globalActions] = useGlobal();
    let rooms = globalState.rooms;
    const {user} = useAuth();
    let onError = (e) => console.dir(e)
    let onSuccess = (rooms) => {
        globalActions.addRoomsFromServer(rooms);
    };
    let addNew = (room) => {
        globalActions.addNewRoom(room)
    }
    let room = {
        id: '123654',
        name: 'name',
        users: ['1', '2', '3'],
        creatorId: '2'
    };
    return (
        <Card headerText='Your rooms'
              render={() => (
                  <div>
                      {isUploaded ?
                          rooms.map(room => {
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
                      <Button text='Hey' className='button' onClick={() => addNew(room)}/>
                  </div>
              )}
        />
    )
}