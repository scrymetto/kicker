import React from "react";
import {Form} from "../../../components/form/form";
import {validationSchema_newGame__scores} from "../../../components/form/__validationSchema/form__validationSchema_newGame";

const maxValueOfScore = 10;

export const Scores = ({initial, setNewStatus, nameInState}) => {

    const scoresOptions = new Array(maxValueOfScore).fill(maxValueOfScore, 0, maxValueOfScore+1)
        .map((number, index) => number - index);
    const inputs = [{
        select: 'team one',
        options: scoresOptions,
        isSearchable:false
    }, {
        select: 'team two',
        options: scoresOptions,
        isSearchable:false
    }];

  return <>
      <div className='margin_left_40'>
          <p className='text'>Select your scores &#127919;</p>
      </div>
      <Form
          className='form'
          initial={initial}
          inputs={inputs}
          validationSchema={validationSchema_newGame__scores}
          onSubmit={(values) => setNewStatus('next', values, nameInState)}
          withRoundButton
      />
  </>
};