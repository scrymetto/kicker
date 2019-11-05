import React, {Fragment, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Table} from "../components/table/table";

import {useAuth} from "../helpers/auth&route/authContext";
import {useGlobal} from "../store";
import {getGames} from "../helpers/requests/getGames";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crashes the app

    let [globalState, globalActions] = useGlobal();
    let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    const {user} = useAuth();
    let [isUploaded, setUploaded] = useState(false);
    console.log(globalState)

    useEffect(() => {
        setTimeout(() => {
            getGames(user, room.id, getSuccess, onError)
                .then(() => setUploaded(true));
        }, 1000)
    }, []);

    let onError = (e) => globalActions.setErrorState(e);
    let getSuccess = (games) => globalActions.addGamesFromServer(games);

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          <Table head={['team', 'score', 'team']} />
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