import React, {Fragment, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Table} from "../components/table/table";

import {useAuth} from "../helpers/auth&route/authContext";
import {useGlobal} from "../store";
import {getGames} from "../helpers/requests/getGames";
import {prepareGamesForTable} from "../helpers/prepareGamesForTable";
import {Steppers} from "../helpers/components/steppers/steppers";
import {prepareUserValuesForNewGame} from "../helpers/prepareUserValuesForNewGame";
import {postGame} from "../helpers/requests/postGame";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crashes the app

    useEffect(() => {
        getGames(user, room.id, getSuccess, onError)
            .then(() => setUploaded(true));
    }, []);

    const {user} = useAuth();
    const onError = (e) => globalActions.setPopup({error: e});
    const getSuccess = (games) => globalActions.addStateFromServer(games, 'games');

    let [globalState, globalActions] = useGlobal();
    // let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    let room = {
        creatorId: "5ddd145a7679161f53e091aa",
        id: "5ddd23867679161f53e091ab",
        name: "1",
        users: ["5ddd145a7679161f53e091aa"]
    };

    let [isUploaded, setUploaded] = useState(false);

    let [form, setForm] = useState(false);

    const createNewGame = (userValues) =>{
        const data = prepareUserValuesForNewGame(userValues);
        postGame(user, room.id, data, onError)
            .then((data)=>{
                globalActions.addNewInState(data, 'games');
            });
        console.log(data);
        setTimeout(setForm, 400, false)
    };

    const columns = ['team', 'score', 'opponent'];
    const columnsStyles = new Map();
    columnsStyles.set([1], {width: '50px'});
    const styles = {columnsStyles: columnsStyles};
    let rows = prepareGamesForTable(globalState.games);

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          {form && <Steppers cancel={() => setForm(false)}
                                             submit={createNewGame}
                          />}
                          <Table columns={columns}
                                 rows={rows}
                                 styles={styles}
                          />
                          {!form && <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>}
                          {!form && <Button className='button button_new' onClick={() => setForm(true)}/>}
                      </Fragment>
                  )
              }}
        />
    )
};