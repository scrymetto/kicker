import React, {useEffect, useState} from 'react';
import '../App.css';
import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {useGlobal} from "../store"
import {getRooms} from "../helpers/requests/getRooms";
import {useAuth} from "../helpers/auth&route/authContext";
import {Paper} from "../components/paper/paper";

export function Rooms() {

    useEffect(() => {
        getRooms(user, onSuccess, onError)
            .then(() => setUploaded(true));
    }, []);

    let [isUploaded, setUploaded] = useState(false);
    let [globalState, globalActions] = useGlobal();
    let rooms = globalState.rooms;
    const {user} = useAuth();
    let onError = (e) => console.log(e)
    let onSuccess = (rooms) => {
        globalActions.addRoomsFromServer(rooms);
    };
    // let addNew = (room) => {
    //     globalActions.addNewRoom(room)
    // }
    // let room = {name: 'name'};
    return (
            <Card headerText='Your rooms'
                  render={() => (
                      <div>
                          {isUploaded ?
                              rooms.map(room => {
                                  console.log(rooms)
                                  console.log(room)
                                  return (
                                      <Paper
                                          key={room.id}
                                          players={room.users}
                                          name={room.name}
                                          admin={room.creatorId}/>
                                  )
                              })
                              : null}
                          <Button text='Hey' className='button' /*onClick={() => addNew(room)}*//>
                      </div>
                  )}
            />
    )
}