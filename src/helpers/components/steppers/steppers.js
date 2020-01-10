import React, {Fragment, useState} from "react";
import {CSSTransition} from "react-transition-group";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Names} from "../newGameForms/names";
import {Players} from "../newGameForms/players";
import {Scores} from "../newGameForms/scrores";

import './steppers.css'
import '../../../components/container/absolute.css'
import {Overlay} from "../../../components/overlay/overlay";
import PropTypes from "prop-types";

const Steppers = ({submit}) => {

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

    // const [namesForm, setNamesFormStatus] = useState(true);
    const [playersForm, setPlayersFormStatus] = useState(true);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const cards = prepareHooksForSteppers([ // create a doubly linked list with hooks
        // [namesForm, setNamesFormStatus],
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
            ? currentCard.next ? currentCard.next : {}
            : currentCard.prev ? currentCard.prev : {};
        if (currentCard.data) {
            currentCard.data[1](true) // if the next card exist, make it visible
        } else {
            setVisible(false);
        }
    };

    return <Fragment>
        <Overlay visible={visible}/>
        <CSSTransition in={visible}
                       classNames='steppers__cards'
                       timeout={300}
                       appear
                       onExited={()=>submit(userValues)}
        >
            <div className='container absolute'>
                <Card headerText='Create a new game'
                      style={{width: '100%', margin: '0'}}
                      render={() => {
                          return <Fragment>
                              {/*{namesForm && <Names initial={userValues.names}*/}
                              {/*                     setNewStatus={setNewStatus}/>}*/}

                              {playersForm && <Players initial={userValues.players}
                                                       setNewStatus={setNewStatus}/>
                              }

                              {scoresForm && <Scores initial={userValues.scores}
                                                     setNewStatus={setNewStatus}/>
                              }
                          </Fragment>
                      }}
                />
                <Button className='button button_back' onClick={() => setNewStatus('prev')}/>
            </div>
        </CSSTransition>
    </Fragment>
};

Steppers.propTypes = {
    submit: PropTypes.func.isRequired
};

export default Steppers;