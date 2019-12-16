import React, {Fragment, Suspense, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Steppers} from "../helpers/components/steppers/steppers";
import {RatingTable} from "../helpers/components/ratingTable";

import {useGlobal} from "../store";
import {useAuth} from "../helpers/auth&route/authContext";
import {getGames} from "../helpers/requests/getGames";
import {getPlayers} from "../helpers/requests/getPlayers";
import {postGame} from "../helpers/requests/postGame";
import {prepareUserValuesForNewGame} from "../helpers/prepareUserValuesForNewGame";

export const RoomById = (props) => {
    //TODO: globalState can be undefined and it crashes the app

    useEffect(() => {
        getGames(user, room.id, getGamesSuccess, onError)
            .then(() => getPlayers(user, room.id, getPlayersSuccess, onError))
            .then(() => setUploaded(true));
    }, []);

    const GameHistoryTable = React.lazy(()=> import("../helpers/components/gameHistoryTable"));

    const {user} = useAuth();
    const onError = (e) => globalActions.setPopup({error: e});
    const getGamesSuccess = (games) => globalActions.addStateFromServer(games, 'games');
    const getPlayersSuccess = (players) => globalActions.addStateFromServer(players, 'players');

    const [globalState, globalActions] = useGlobal();
    // let room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    const room = {
        creatorId: "5ddd145a7679161f53e091aa",
        id: "5ddd23867679161f53e091ab",
        name: "1",
        users: ["5ddd145a7679161f53e091aa"]
    };

    const players = globalState.players;
    console.log(players)

    const [isUploaded, setUploaded] = useState(false);

    const [form, setForm] = useState(false);

    const createNewGame = (userValues) => {
        const data = prepareUserValuesForNewGame(userValues);
        postGame(user, room.id, data, onError)
            .then((data) => {
                globalActions.addNewInState(data, 'games');
            });
        setTimeout(setForm, 300, false)
    };

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          {form && <Steppers cancel={() => setForm(false)}
                                             submit={createNewGame}
                          />}
                          <RatingTable players={players}/>
                          <Suspense fallback={<div>Loading...</div>}>
                              <GameHistoryTable games={globalState.games}/>
                          </Suspense>
                          {!form && <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>}
                          {!form && <Button className='button button_new' onClick={() => setForm(true)}/>}
                          <div className='container margin_15'>
                              <p className='text text_link'
                              >Show game history</p>
                          </div>
                          {!form && <Button className='button button_settings'/>}
                      </Fragment>
                  )
              }}
        />
    )
};
