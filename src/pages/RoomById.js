import React from 'react';
import {useGlobal} from "../store";
import {Card} from "../components/card/card";

export const RoomById = ({match}) => {
    //TODO: globalState can be undefined and it crash the app
    let [globalState, globalActions] = useGlobal();
    console.log(globalState);
    let room = globalState.rooms.find((room) => room.id === match.params.roomId);
    console.log(room)

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return <p>{room.name}</p>
              }}
        />
    )
};