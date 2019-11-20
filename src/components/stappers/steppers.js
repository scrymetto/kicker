import React, {Fragment, useState} from "react";
import {Card} from "../card/card";
import {Button} from "../button/button";
import {Form} from "../form/form";

import {prepareHooksForSteppers} from "../../helpers/prepareHooksForSteppers";
import {validationSchema_newGame__name} from "../form/__validationSchema/form__validationSchema_newGame";

export const Steppers = (props) => {
    const {cancel, create} = props;
    const [namesForm, setNamesFormStatus] = useState(true);
    const [playersForm, setPlayersFormStatus] = useState(false);
    const [scoresForm, setScoresFormStatus] = useState(false);

    const states = prepareHooksForSteppers([
        [namesForm, setNamesFormStatus],
        [playersForm, setPlayersFormStatus],
        [scoresForm, setScoresFormStatus]]);
    let currentStatus = states.getCurrent();
    const setNewStatus = (prevOrNext, values) => {
        console.log(values)
        currentStatus.data[1](false);
        currentStatus = prevOrNext === 'next'
            ? currentStatus.next ? currentStatus.next : create()
            : currentStatus.prev ? currentStatus.prev : cancel();
        if (currentStatus) currentStatus.data[1](true)
    };
    const nameInitial = {
        teamOne: '',
        teamTwo: ''
    };
    const nameInput = [{string: 'team one'}, {string: 'team two'}]

    return <Fragment>
        <Card headerText='Create a new game'
              render={() => {
                  return <Fragment>
                      {namesForm && <Form
                          initial={nameInitial}
                          input={nameInput}
                          validationSchema={validationSchema_newGame__name}
                          onSubmit={(values) => setNewStatus('next', values)}
                      >
                          namesForm
                      </Form>}
                      {playersForm && <p>playersForm</p>}
                      {scoresForm && <p>scoresForm</p>}
                      <button onClick={() => setNewStatus('next')}>next</button>
                      <button onClick={() => setNewStatus('prev')}>prev</button>
                  </Fragment>
              }}
        />
    </Fragment>
};