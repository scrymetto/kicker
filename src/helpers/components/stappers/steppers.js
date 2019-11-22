import React, {Fragment, useState} from "react";
import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";
import {Form} from "../../../components/form/form";

import {prepareHooksForSteppers} from "../../prepareHooksForSteppers";
import {validationSchema_newGame__name} from "../../../components/form/__validationSchema/form__validationSchema_newGame";

export const Steppers = (props) => {
    const {cancel, submit} = props;
    const [namesForm, setNamesFormStatus] = useState(true);
    const [playersForm, setPlayersFormStatus] = useState(false);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const states = prepareHooksForSteppers([
        [namesForm, setNamesFormStatus],
        [playersForm, setPlayersFormStatus],
        [scoresForm, setScoresFormStatus]]);
    let currentStatus = states.getCurrent();
    const setNewStatus = (prevOrNext, values) => {
        currentStatus.data[1](false);
        currentStatus = prevOrNext === 'next'
            ? currentStatus.next ? currentStatus.next : submit()
            : currentStatus.prev ? currentStatus.prev : cancel();
        if (currentStatus) currentStatus.data[1](true)
    };
    const nameInitial = {
        teamOne: '',
        teamTwo: ''
    };
    const nameInput = [{string: 'team one'}, {string: 'team two'}]
    const playersInput = [{
        select: 'team one',
        options: [{value: 'red', label: 'red'}, {value: 'blue', label: 'blue'}, {value: 'orange', label: 'orange'}]
    }, {select: 'team two', options: [{value: 'red', label: 'red'}, {value: 'blue', label: 'blue'}, {value: 'orange', label: 'orange'}]}]

    return <Fragment>
        <Card headerText='Create a new game'
              render={() => {
                  return <Fragment>
                      {namesForm && <Form
                          initial={nameInitial}
                          inputs={nameInput}
                          validationSchema={validationSchema_newGame__name}
                          onSubmit={(values) => setNewStatus('next', values)}
                      />}
                      {playersForm && <Form
                          initial={nameInitial}
                          inputs={playersInput}
                          validationSchema={validationSchema_newGame__name}
                          onSubmit={(values) => setNewStatus('next', values)}
                      />}
                      {scoresForm && <Form
                          initial={nameInitial}
                          inputs={nameInput}
                          validationSchema={validationSchema_newGame__name}
                          onSubmit={(values) => setNewStatus('next', values)}
                      />}
                      <button onClick={() => setNewStatus('next')}>next</button>
                      <button onClick={() => setNewStatus('prev')}>prev</button>
                  </Fragment>
              }}
        />
    </Fragment>
};