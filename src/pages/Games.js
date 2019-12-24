import React, {Fragment, Suspense, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {RatingTable} from "../helpers/components/ratingTable";

import {useGlobal} from "../store";
import {useAuth} from "../helpers/auth&route/authContext";
import {getGames} from "../helpers/requests/getGames";
import {postGame} from "../helpers/requests/postGame";
import {prepareUserValuesForNewGame} from "../helpers/prepareUserValuesForNewGame";
import {scrollToTop} from "../helpers/scrollToTop";

export const Games = (props) => {
    //TODO: globalState can be undefined and it crashes the app
    const [globalState, globalActions] = useGlobal();
    const {user} = useAuth();

    useEffect(() => {
        getGames(user, room.id, getGamesSuccess, onError)
            .then(() => {
                const players = room.players;
                // const players = require('../../__mocks__/players');
                globalActions.addStateFromServer(players, 'players')
            })
    }, []);

    const onError = (e) => globalActions.setPopup({error: e});
    const getGamesSuccess = (games) => globalActions.addStateFromServer(games, 'games');

    const players = globalState.players;

    const GameHistoryTable = React.lazy(() => import("../helpers/components/gameHistoryTable/gameHistoryTable"));
    const Steppers = React.lazy(() => import("../helpers/components/steppers/steppers"));
    const ActionsMenu = React.lazy(() => import("../helpers/components/actionsMenu/actionsMenu"));

    const [newGameSteppers, openNewGameSteppers] = useState(false);
    const [history, showHistory] = useState(false);
    const [menuIsOpen, openMenu] = useState(false);

    const room = globalState.rooms.find((room) => room.id === props.match.params.roomId);
    console.log(room)

    const openSteppers = () => {
        scrollToTop();
        showHistory(false);
        openNewGameSteppers(true)
    };

    const openActions = () => {
        scrollToTop();
        showHistory(false);
        openMenu(true)
    };

    const createNewGame = (userValues) => {
        if (userValues.players.teamOne.length > 0) {
            const data = prepareUserValuesForNewGame(userValues);
            postGame(user, room.id, data, onError)
                .then((data) => {
                    globalActions.addNewInState(data, 'games');
                });
        }
        openNewGameSteppers(false)
    };

    const doActions = (something) => {
        if (something.players){
            globalActions.addStateFromServer(something.players, 'players')
        }
        openMenu(false);
    };

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          {newGameSteppers &&
                          <Suspense fallback={<div>Loading..</div>}>
                              <Steppers
                                  submit={createNewGame}
                              />
                          </Suspense>}
                          <RatingTable players={players}/>
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>}
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button className='button button_new' onClick={openSteppers}/>}
                          {!history
                              ? <div className='container margin_15'>
                                  <p className='text text_link' onClick={() => showHistory(true)}
                                  >Show game history</p>
                              </div>
                              : <Fragment>
                                  <Suspense fallback={<div>Loading...</div>}>
                                      <GameHistoryTable games={globalState.games} changeState={showHistory}/>
                                  </Suspense>
                              </Fragment>}
                          {menuIsOpen &&
                          <Suspense fallback={<div>Loading...</div>}>
                              <ActionsMenu room={room} closeMenu={doActions}/>
                          </Suspense>
                          }
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button className='button button_actions' onClick={openActions}/>}
                      </Fragment>
                  )
              }}
        />
    )
};
