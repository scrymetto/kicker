import React, {Fragment, Suspense, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {RatingTable} from "../helpers/components/ratingTable";
import GameHistoryTable from "../helpers/components/gameHistoryTable/gameHistoryTable";
import {Spinner} from "../components/spinner/spinner";
import {Players} from "../../src/helpers/components/newGameForms/players";
import {Scores} from "../../src/helpers/components/newGameForms/scrores";
// import {Names} from "../helpers/components/newGameForms/names";


import {useGlobal} from "../store";
import {useAuth} from "../helpers/auth&route/authContext";
import {getGames} from "../helpers/requests/getGames";
import {postGame} from "../helpers/requests/postGame";
import {prepareUserValuesForNewGame} from "../helpers/prepareUserValuesForNewGame";
import {scrollToTop} from "../helpers/scrollToTop";

export function Games(props) {
    const [globalState, globalActions] = useGlobal();
    const {user} = useAuth();

    const room = globalState.rooms.find((room) => room.id === props.match.params.roomId);

    const [isLoading, endLoading] = useState(true);

    useEffect(() => {
        //TODO: not 'getGames', but 'getStatistic'
        getGames(user, room.id, '')
            .then(() => {
                let players = {};
                room.players.forEach(player => {
                    players[player.id] = player.nickname
                });
                globalActions.addStateFromServer(players, 'players');
                // const players = require('../../__mocks__/players');

            })
            .then(() => endLoading(false))
            .catch(e => {
                onError(e)
            })
    }, []);

    const onError = (e) => globalActions.setPopup({error: e.request.response});
    const onPostGameSuccess = (data) => {
        globalActions.addNewInState(data, 'games');
        globalActions.setPopup({success: '🎉 Your game has been saved!'});
    };

    const players = globalState.players;

    const Steppers = React.lazy(() => import("../components/steppers/steppers"));
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
        showHistory(true)
    };

    const createNewGame = (userValues) => {
        if (userValues.card1.teamOne.length > 0) {
            const data = prepareUserValuesForNewGame(userValues, players, room.id);
            postGame(user, data)
                .then(data => {
                    onPostGameSuccess(data)
                })
                .catch(e => {
                    onError(e)
                })
        }
        openNewGameSteppers(false)
    };

    const doActionsFromMenu = (obj) => {
        if (obj.players) {
            obj.players.forEach((player) => globalActions.addNewKey('players', player.id, player.nickname))
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
                                  numberOfCards={2}
                                  submit={createNewGame}
                                  components={[
                                      {
                                          component: Players,
                                          form: true,
                                          initial: {teamOne: [], teamTwo: []}
                                      },
                                      // {
                                      //     component: Names,
                                      //     form: true,
                                      //     initial: {teamOne: '', teamTwo: ''}
                                      // },
                                      {
                                          component: Scores,
                                          form: true,
                                          initial: {teamOne: 0, teamTwo: 0}
                                      }
                                  ]}
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
                                  <Button className='button button_underlinedText'
                                          onClick={openHistory}
                                          text={'Show game history'}
                                  />
                              </div>
                              : <Fragment>
                                  <GameHistoryTable room={room} changeState={showHistory}/>
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
