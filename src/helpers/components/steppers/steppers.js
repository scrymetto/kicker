import React, {Fragment, useState} from "react";
import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";
import {Names} from "./forms/names";
import {Players} from "./forms/players";
import {Scores} from "./forms/scrores";

export const Steppers = ({cancel, submit}) => {

    const [values, setValues] = useState(
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

    const cards = prepareHooksForSteppers([
        [namesForm, setNamesFormStatus],
        [playersForm, setPlayersFormStatus],
        [scoresForm, setScoresFormStatus]]);
    let currentCard = cards.getCurrent();
    console.log(values)

    const setNewStatus = (prevOrNext, values, card) => {
        if (values) {
            let obj = {};
            obj[card] = values;
            setValues((prev) => Object.assign(prev, obj))
        }
        currentCard.data[1](false);
        currentCard = prevOrNext === 'next'
            ? currentCard.next ? currentCard.next : submit
            : currentCard.prev ? currentCard.prev : cancel;
        if (currentCard.data) {
            currentCard.data[1](true)
        } else {
            currentCard()
        }
    };

    return <Fragment>

        <Card headerText='Create a new game'
              render={() => {
                  return <Fragment>
                      {namesForm && <Names initial={values.names}
                                           setNewStatus={setNewStatus}/>}

                      {playersForm && <Players initial={values.players}
                                               setNewStatus={setNewStatus}/>
                      }

                      {scoresForm && <Scores initial={values.scores}
                                             setNewStatus={setNewStatus}/>
                      }
                      <Button className='button button_back' onClick={() => setNewStatus('prev')}/>
                  </Fragment>
              }}
        />
    </Fragment>
};