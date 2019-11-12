import React, {Fragment, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Table} from "../components/table/table";

import {useAuth} from "../helpers/auth&route/authContext";
import {useGlobal} from "../store";
import {getGames} from "../helpers/requests/getGames";
import {prepareGamesForTable} from "../helpers/prepareGamesForTable";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crashes the app

    let [globalState, globalActions] = useGlobal();
    let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    const {user} = useAuth();
    let [isUploaded, setUploaded] = useState(false);

    useEffect(() => {
            getGames(user, room.id, getSuccess, onError)
                .then(() => setUploaded(true));
    }, []);

    let onError = (e) => globalActions.setPopup({error: e});
    let getSuccess = (games) => globalActions.addGamesFromServer(games);
    let columns = ['team', 'score', 'opponent'];
    let rows = prepareGamesForTable(globalState.games);
    console.log(rows)

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          <Table columns={columns}
                                 rows={rows}/>
                          {!rows[0] && <div className='container margin_15'>
                              <p className='text'>You haven’t played with anyone in this room yet. Let's create a new game!</p>
                          </div>}
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