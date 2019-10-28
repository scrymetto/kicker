import React, {Fragment} from 'react';
import {useGlobal} from "../store";
import {Card} from "../components/card/card";
import {Button} from "../components/button/button";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crash the app
    let [globalState, globalActions] = useGlobal();
    let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          <p>{room.name}</p>
                          <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>
                          <Button className='button button_new'/>
                      </Fragment>
                  )
              }}
        />
    )
};