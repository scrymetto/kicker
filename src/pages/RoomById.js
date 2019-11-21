import React, {Fragment, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Table} from "../components/table/table";

import {useAuth} from "../helpers/auth&route/authContext";
import {useGlobal} from "../store";
import {getGames} from "../helpers/requests/getGames";
import {prepareGamesForTable} from "../helpers/prepareGamesForTable";
import {Steppers} from "../helpers/components/stappers/steppers";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crashes the app

    useEffect(() => {
        getGames(user, room.id, getSuccess, onError)
            .then(() => setUploaded(true));
    }, []);
    let [globalState, globalActions] = useGlobal();
    let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    const {user} = useAuth();
    let [isUploaded, setUploaded] = useState(false);
    let [form, setForm] = useState(false)
    let newGame = () => setForm(true)

    const onError = (e) => globalActions.setPopup({error: e});
    const getSuccess = (games) => globalActions.addGamesFromServer(games);
    const columns = ['team', 'score', 'opponent'];
    const rows = prepareGamesForTable(globalState.games);
    const columnsStyles = new Map();
    columnsStyles.set([1], {width: '50px'});
    const styles = {columnsStyles: columnsStyles};

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          <Table columns={columns}
                                 rows={rows}
                                 styles={styles}
                          />
                          {form && <Steppers cancel={()=>setForm(false)} submit={()=>setForm(false)}/>}
                          <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>
                          <Button className='button button_new' onClick={newGame}/>
                      </Fragment>
                  )
              }}
        />
    )
};