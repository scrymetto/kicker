import React, {Fragment} from "react";
import {Form} from "../../../components/form/form";
import {validationSchema_newGame__scores} from "../../../components/form/__validationSchema/form__validationSchema_newGame";

export const Scores = ({initial, setNewStatus, nameInState}) => {

    const scoresOptions = new Array(10).fill(1, 0, 10).map((number, index) => number + index);
    const inputs = [{
        select: 'team one',
        options: scoresOptions,
        isSearchable:false
    }, {
        select: 'team two',
        options: scoresOptions,
        isSearchable:false
    }];

  return <Fragment>
      <div className='margin_left_40'>
          <p className='text' data-testid='scores'>Select your scores &#127919;</p>
      </div>
      <Form
          className='form'
          initial={initial}
          inputs={inputs}
          validationSchema={validationSchema_newGame__scores}
          onSubmit={(values) => setNewStatus('next', values, nameInState)}
          withRoundButton
      />
  </Fragment>
};