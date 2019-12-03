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
    const [namesForm, setNamesFormStatus] = useState(true);
    const [playersForm, setPlayersFormStatus] = useState(false);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const [values, setValues] = useState(
        {
            names: {
                teamOne: '',
                teamTwo: ''
            },
            players: {
                teamOne: ['red'],
                teamTwo: []
            },
            scores: {
                teamOne: 0,
                teamTwo: 0
            }
        }
    );

    const cards = prepareHooksForSteppers([
        [namesForm, setNamesFormStatus],
        [playersForm, setPlayersFormStatus],
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
            ? currentCard.next ? currentCard.next : submit
            : currentCard.prev ? currentCard.prev : cancel;
        if (currentCard.data) {currentCard.data[1](true)} else {currentCard()}
    };
    const nameInput = [{string: 'team one'}, {string: 'team two'}]

    const playersInput = [{
        select: 'team one',
        options: ['red', 'blue', 'orange', 'black', 'ftgyhifghjliulgfljgfdylutdkydrkyhdtrl,jhuft'],
    }, {
        select: 'team two',
        options: ['red', 'blue', 'orange', 'black', 'ftgyhifghjliulgfljgfdylutdkydrkyhdtrl,jhuft'],
    }];

    const scoresOptions = new Array(10).fill(1, 0, 10).map((number, index) => number + index)

    const scoresInput = [{
            select: 'team one',
            options: scoresOptions
        }, {
            select: 'team two',
            options: scoresOptions
        }];


    return <Fragment>

        <Card headerText='Create a new game'
              render={() => {
                  return <Fragment>
                      {namesForm &&
                      <Fragment>
                          <div className='margin_left_50'><p className='text'>
                              Come up with names for the teams &#9917;</p></div>
                          <Form
                              className='form'
                              initial={values.names}
                              inputs={nameInput}
                              validationSchema={validationSchema_newGame__name}
                              onSubmit={(values) => setNewStatus('next', values, 'names')}
                              withRoundButton
                          />
                      </Fragment>}

                      {playersForm &&
                      <Fragment>
                          <div className='margin_left_50'><p className='text'>
                              Select the players &#127939;</p></div>
                          <Form
                              className='form'
                              initial={values.players}
                              inputs={playersInput}
                              validationSchema={validationSchema_newGame__players}
                              onSubmit={(values) => setNewStatus('next', values, 'players')}
                              withRoundButton
                          />
                      </Fragment>}

                      {scoresForm &&
                      <Fragment>
                          <div className='margin_left_50'><p className='text'>
                              Select your scores &#127919;</p></div>
                          <Form
                              className='form'
                              initial={values.scores}
                              inputs={scoresInput}
                              validationSchema={validationSchema_newGame__scores}
                              onSubmit={(values) => setNewStatus('next', values, 'scores')}
                          />
                      </Fragment>}
                      <Button className='button button_back' onClick={() => setNewStatus('prev')}>prev</Button>
                  </Fragment>
              }}
        />
    </Fragment>
};