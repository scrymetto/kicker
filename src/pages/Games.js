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
import {Spinner} from "../components/spinner/spinner";

export function Games(props) {
    //TODO: globalState can be undefined and it crashes the app
    const [globalState, globalActions] = useGlobal();
    const {user} = useAuth();

    const room = globalState.rooms.find((room) => room.id === props.match.params.roomId);

    const [isLoading, endLoading] = useState(true);

    useEffect(() => {
        //TODO: not 'getGames', but 'getStatistic'
        getGames(user, room.id, 0, getGamesSuccess1, onError)
            .then(() => {
                let players = {};
                room.players.forEach(player => {
                    players[player.id] = player.nickname
                });
                globalActions.addStateFromServer(players, 'players');
                // const players = require('../../__mocks__/players');

            })
            .then(() => endLoading(false))
    }, []);

    const onError = (e) => globalActions.setPopup({error: e});
    const getGamesSuccess = (games) => globalActions.addStateFromServer(games, 'games');
    const getGamesSuccess1 = (games) => console.log('meh');

    const players = globalState.players;

    const GameHistoryTable = React.lazy(() => import("../helpers/components/gameHistoryTable/gameHistoryTable"));
    const Steppers = React.lazy(() => import("../helpers/components/steppers/steppers"));
    const ActionsMenu = React.lazy(() => import("../helpers/components/actionsMenu/actionsMenu"));

    const [newGameSteppers, openNewGameSteppers] = useState(false);
    const [history, showHistory] = useState(false);
    const [menuIsOpen, openMenu] = useState(false);

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

    const openHistory = () => {
        getGames(user, room.id, 0, getGamesSuccess, onError)
            .then(()=>showHistory(true));
    };

    const createNewGame = (userValues) => {
        if (userValues.players.teamOne.length > 0) {
            const data = prepareUserValuesForNewGame(userValues, players, room.id);
            postGame(user, data, onError)
                .then((data) => {
                    globalActions.addNewInState(data, 'games');
                });
        }
        openNewGameSteppers(false)
    };

       const doActionsFromMenu = (obj) => {
        if (obj.players) {
            obj.players.forEach((player)=>globalActions.addNewKey('players', player.id, player.nickname))
        }
        openMenu(false);
    };

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <Fragment>
                          {newGameSteppers &&
                          <Suspense fallback={<Spinner/>}>
                              <Steppers
                                  submit={createNewGame}
                              />
                          </Suspense>}
                          {isLoading
                              ? <Spinner/>
                              : <RatingTable players={players}/>}
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button
                              className='button button_back'
                              onClick={props.history.goBack}/>}
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button className='button button_new' onClick={openSteppers}/>}
                          {!history
                              ? <div className='container margin_15'>
                                  <p className='text text_link' onClick={openHistory}
                                  >Show a history of games</p>
                              </div>
                              : <Fragment>
                                  <Suspense fallback={<Spinner/>}>
                                      <GameHistoryTable room={room} changeState={showHistory}/>
                                  </Suspense>
                              </Fragment>}
                          {menuIsOpen &&
                          <Suspense fallback={<Spinner/>}>
                              <ActionsMenu room={room} closeMenu={doActionsFromMenu}/>
                          </Suspense>
                          }
                          {(!newGameSteppers && !menuIsOpen) &&
                          <Button className='button button_actions' onClick={openActions}/>}
                      </Fragment>
                  )
              }}
        />
    )
}
