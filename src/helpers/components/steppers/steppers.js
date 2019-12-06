import React, {Fragment, useState} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Names} from "../newGameForms/names";
import {Players} from "../newGameForms/players";
import {Scores} from "../newGameForms/scrores";

import './steppers.css'
import '../../../components/container/fixed.css'

export const Steppers = ({cancel, submit}) => {

    const [visible, setVisible] = useState(true);
    const [userValues, setUserValues] = useState(
        {
            names: {
                teamOne: '',
                teamTwo: ''
            },
            players: {
                teamOne: [],
                teamTwo: []
            },
            scores: {
                teamOne: 0,
                teamTwo: 0
            }
        }
    );

    const [namesForm, setNamesFormStatus] = useState(true);
    const [playersForm, setPlayersFormStatus] = useState(false);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const cards = prepareHooksForSteppers([ // create doubly linked list with hooks
        [namesForm, setNamesFormStatus],
        [playersForm, setPlayersFormStatus],
        [scoresForm, setScoresFormStatus]]);

    let currentCard = cards.getCurrent();

    const setNewStatus = (prevOrNext, values, card) => {
        if (values) {
            let obj = {};
            obj[card] = values;
            setUserValues((prev) => Object.assign(prev, obj)) //set new state
        }
        currentCard.data[1](false); // make the current card invisible
        currentCard = prevOrNext === 'next' // find next card
            ? currentCard.next ? currentCard.next : submit
            : currentCard.prev ? currentCard.prev : cancel;
        if (currentCard.data) {
            currentCard.data[1](true) // if the next card exist, make it visibleOverlay
        } else {
            setVisible(false);
            setTimeout(currentCard, 350, userValues) // else close <Steppers/> after animation
        }
    };

    return <TransitionGroup appear className='steppers'>
        {visible && <CSSTransition classNames='steppers__overlay'
                                   timeout={300}>
            <div className='steppers__overlay'>
                <Button className='button button_back' onClick={() => setNewStatus('prev')}/>
            </div>
        </CSSTransition>}
        {visible && <CSSTransition classNames='steppers__cards'
                           timeout={300}>
            <div className='container fixed'>
                <Card headerText='Create a new game'
                      render={() => {
                          return <Fragment>
                              {namesForm && <Names initial={userValues.names}
                                                   setNewStatus={setNewStatus}/>}

                              {playersForm && <Players initial={userValues.players}
                                                       setNewStatus={setNewStatus}/>
                              }

                              {scoresForm && <Scores initial={userValues.scores}
                                                     setNewStatus={setNewStatus}/>
                              }
                          </Fragment>
                      }}
                />
            </div>
        </CSSTransition>}
    </TransitionGroup>
};