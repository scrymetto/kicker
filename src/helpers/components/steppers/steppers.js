import React, {Fragment, useState} from "react";
import {CSSTransition} from "react-transition-group";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";

import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
// import {Names} from "../newGameForms/names";
import {Players} from "../newGameForms/players";
import {Scores} from "../newGameForms/scrores";

import './steppers.css'
import '../../../components/container/absolute.css'
import {Overlay} from "../../../components/overlay/overlay";
import PropTypes from "prop-types";

const makeHooks = (number, components) => {
    let hooks = [];
    let initial = {};
    for (let i = 0; i < number; i++) {
        if (i === 0) {
            hooks[i] = useState(true);
            initial['card1'] = {};
            components[i].fields.forEach(key=>{
                initial['card1'][key]=''
            })
        } else {
            hooks[i] = useState(false);
            const cardName = 'card' + (i + 1);
            initial[cardName] = {};
            components[i].fields.forEach(key=>{
                initial[cardName][key]=''
            })
        }
    }
    return[hooks, initial]
};

const Steppers = ({numberOfCards, components, submit}) => {

    const [visible, setVisible] = useState(true);
    // const [userValues, setUserValues] = useState(
    //     {
    //         // names: {
    //         //     teamOne: '',
    //         //     teamTwo: ''
    //         // },
    //         players: {
    //             teamOne: [],
    //             teamTwo: []
    //         },
    //         scores: {
    //             teamOne: 0,
    //             teamTwo: 0
    //         }
    //     }
    // );
    let [hooks, initial] = makeHooks(numberOfCards, components);

    console.log(hooks, initial);
    const [userValues, setUserValues] = useState(initial);

    // const [namesForm, setNamesFormStatus] = useState(true);
    // const [playersForm, setPlayersFormStatus] = useState(true);
    // const [scoresForm, setScoresFormStatus] = useState(false);

    // const cards = prepareHooksForSteppers([ // create a doubly linked list with hooks
    //     // [namesForm, setNamesFormStatus],
    //     [playersForm, setPlayersFormStatus],
    //     [scoresForm, setScoresFormStatus]]);

    const cards = prepareHooksForSteppers(hooks);

    let currentCard = cards.getCurrent();

    const setNewStatus = (prevOrNext, values, card) => {
        if (values) {
            let obj = {};
            obj[card] = values;
            setUserValues(Object.assign(userValues, obj)) //set new state
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
                       onExited={() => submit(userValues)}
        >
            <div className='container absolute'>
                <Card headerText='Create a new game'
                      style={{width: '100%', margin: '0'}}
                      render={() => {
                          return <Fragment>
                              {/*{namesForm && <Names initial={userValues.names}
                                                  setNewStatus={setNewStatus}/>}

                              {playersForm && <Players initial={userValues.players}
                                                       setNewStatus={setNewStatus}/>
                              }

                              {scoresForm && <Scores initial={userValues.scores}
                                                     setNewStatus={setNewStatus}/>
                              }*/}
                              {hooks.map((hook, index) => {
                                  const Card = components[index].component;
                                  const initial = 'card'+(++index);
                                  return hook[0] && <Card key={index}
                                                          setNewStatus={setNewStatus}
                                                          initial={userValues[initial]}/>
                              })
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
    submit: PropTypes.func.isRequired,
    numberOfCards: PropTypes.number,
};

export default Steppers;