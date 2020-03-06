import React, {Suspense, useEffect, useState} from 'react';

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {RatingTable} from "../helpers/components/ratingTable";
import GameHistoryTable from "../helpers/components/gameHistoryTable/gameHistoryTable";
import {Spinner} from "../components/spinner/spinner";
import {Players} from "../../src/helpers/components/newGameForms/players";
import {Scores} from "../../src/helpers/components/newGameForms/scrores";
import {ErrorComponent} from "../helpers/components/errorComponent";
// import {Names} from "../helpers/components/newGameForms/names";

import {useGlobal} from "../store";
import {useAuth} from "../helpers/auth&route/authContext";
import {postGame} from "../helpers/requests/postGame";
import {setErrorPopup} from "../helpers/setErrorPopup";
import {prepareUserValuesForNewGame} from "../helpers/prepareUserValuesForNewGame";
import {scrollToTop} from "../helpers/scrollToTop";

const stepperComponents = [
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
];

export function Games(props) {
    const [globalState, globalActions] = useGlobal();
    const {user} = useAuth();

    const room = globalState.rooms.find((room) => room.id === props.match.params.roomId);

    const [isUploaded, setUploaded] = useState({loading: true, done: false, error: false});
    const [rerender, setRerender] = useState(0);

    useEffect(() => {
        let players = {};
        room.players.forEach(player => {
            players[player.id] = player.nickname
        });
        globalActions.addStateFromServer(players, 'players');
        // const players = require('../../__mocks__/players');
        setUploaded({loading: false, done: true, error: false})
    }, []);

    const onPostGameSuccess = (data) => {
        globalActions.addNewInState(data, 'games');
        setRerender(rerender + 1);
        globalActions.setPopup({success: '🎉 Your game has been saved!'}); //&#127881;
    };

    const players = globalState.players;

    const Steppers = React.lazy(() => import("../components/steppers/steppers"));
    const ActionsMenu = React.lazy(() => import("../helpers/components/actionsMenu/actionsMenu"));

    const [newGameSteppers, openNewGameSteppers] = useState(false);
    const [history, showHistory] = useState(false);
    const [menuIsOpen, openMenu] = useState(false);

    const openLazy = (hook) => {
        if (globalState.popup.success || globalState.popup.error) {
            globalActions.setPopup({})
        }
        scrollToTop();
        showHistory(false);
        hook(true)
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
                    setErrorPopup(e, globalActions.setPopup);
                    setUploaded({loading: false, done: false, error: true})
                })
        }
        openNewGameSteppers(false)
    };

    const doActionsFromMenu = (obj) => {
        if (obj.players) {
            obj.players.forEach((player) => globalActions.addNewKey('players', player.id, player.nickname))
        }
        setRerender(rerender + 1);
        openMenu(false);
    };

    return (
        <Card headerText={`Your games in ${room.name}`}
              render={() => {
                  return (
                      <>
                          {isUploaded.done && <>

                              {newGameSteppers &&
                              <Suspense fallback={<Spinner/>}>
                                  <Steppers
                                      numberOfCards={stepperComponents.length}
                                      submit={createNewGame}
                                      components={stepperComponents}/>
                              </Suspense>}

                              <RatingTable room={room} rerender={rerender}/>

                              {(!newGameSteppers && !menuIsOpen) &&
                              <Button
                                  className='button button_back'
                                  onClick={props.history.goBack}/>}

                              {(!newGameSteppers && !menuIsOpen) &&
                              <Button className='button button_new' onClick={() => openLazy(openNewGameSteppers)}/>}

                              {!history
                                  ? <div className='container margin_15'>
                                      <Button className='button button_underlinedText'
                                              onClick={openHistory}
                                              text={'Show game history'}
                                      />
                                  </div>
                                  : <>
                                      <GameHistoryTable room={room} changeState={showHistory}/>
                                  </>}

                              {menuIsOpen &&
                              <Suspense fallback={<Spinner/>}>
                                  <ActionsMenu room={room} closeMenu={doActionsFromMenu}/>
                              </Suspense>
                              }

                              {(!newGameSteppers && !menuIsOpen) &&
                              <Button className='button button_actions' onClick={() => openLazy(openMenu)}/>}
                          </>}

                          {isUploaded.loading && <Spinner/>}

                          {isUploaded.error && <ErrorComponent/>}
                      </>
                  )
              }}
        />
    )
}
