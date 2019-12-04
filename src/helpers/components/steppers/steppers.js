import React, {Fragment, useState} from "react";
import {CSSTransition} from "react-transition-group";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Names} from "./forms/names";
import {Players} from "./forms/players";
import {Scores} from "./forms/scrores";

import './steppers.css'

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
            currentCard.data[1](true) // if there is next card, make it visible
        } else {
            setVisible(false);
            setTimeout(currentCard, 350, userValues) // else close <Steppers/>
        }
    };

    return <CSSTransition in={visible} timeout={300} classNames='steppers' appear={true}>
        <div className='overlay'>
        <Card headerText='Create a new game'
              style={{marginTop:'15px'}}
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

                      <Button className='button button_back' onClick={() => setNewStatus('prev')}/>
                  </Fragment>
              }}
        />
        </div>
    </CSSTransition>
};