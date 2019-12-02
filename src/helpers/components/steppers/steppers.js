import React, {Fragment, useState} from "react";
import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Form} from "../../../components/form/form";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";
import {validationSchema_newGame__name} from "../../../components/form/__validationSchema/form__validationSchema_newGame";
import {validationSchema_newGame__scores} from "../../../components/form/__validationSchema/form__validationSchema_newGame";
import {validationSchema_newGame__players} from "../../../components/form/__validationSchema/form__validationSchema_newGame";

export const Steppers = (props) => {
    const {cancel, submit} = props;
    const [namesForm, setNamesFormStatus] = useState(false);
    const [playersForm, setPlayersFormStatus] = useState(true);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const [values, setValues] = useState(
        {
            names: {
                teamOne: '',
                teamTwo: ''
            },
            players: {
                teamOne: [{value:'red', label:'red'}],
                teamTwo: []
            },
            scores: {
                teamOne: 0,
                teamTwo: 0
            }
        }
    );

    const cards = prepareHooksForSteppers([
        [playersForm, setPlayersFormStatus],
        [namesForm, setNamesFormStatus],
        [scoresForm, setScoresFormStatus]]);
    let currentCard = cards.getCurrent();
    console.log(values);
    const setNewStatus = (prevOrNext, values, card) => {
        if (values) {
            let obj = {};
            obj[card] = values;
            setValues((prev) => Object.assign(prev, obj))
        }

        console.log(values)
        currentCard.data[1](false);
        currentCard = prevOrNext === 'next'
            ? currentCard.next ? currentCard.next : submit()
            : currentCard.prev ? currentCard.prev : cancel();
        if (currentCard) currentCard.data[1](true);
    };
    const nameInput = [{string: 'team one'}, {string: 'team two'}]
    const options = ['red', 'blue', 'orange', 'black', 'ftgyhifghjliulgfljgfdylutdkydrkyhdtrl,jhuft'];
    const playersInput = [{
        select: 'team one',
        options: options.map(i=>{ return {value:i, label: i}}),
    }, {
        select: 'team two',
        options: options.map(i=>{ return {value:i, label: i}}),
    }]


    return <Fragment>

        <Card headerText='Create a new game'
              render={() => {
                  return <Fragment>

                      {playersForm && <Form
                          initial={values.players}
                          inputs={playersInput}
                          validationSchema={validationSchema_newGame__players}
                          onSubmit={(values) => setNewStatus('next', values, 'players')}
                      />}

                      {namesForm && <Form
                          initial={values.names}
                          inputs={nameInput}
                          validationSchema={validationSchema_newGame__name}
                          onSubmit={(values) => setNewStatus('next', values, 'names')}
                      />}

                      {scoresForm && <Form
                          initial={values.names}
                          inputs={nameInput}
                          validationSchema={validationSchema_newGame__scores}
                          onSubmit={(values) => setNewStatus('next', values, 'scores')}
                      />}
                      <button onClick={() => setNewStatus('next')}>next</button>
                      <button onClick={() => setNewStatus('prev')}>prev</button>
                  </Fragment>
              }}
        />
    </Fragment>
};