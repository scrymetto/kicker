import React, {Fragment} from 'react';
import {validationSchema_newRoom} from "../../components/form/__validationSchema/form__validationSchema_newRoom";
import {Form} from "../../components/form/form";

export const NewRoomFrom = ({onSubmit}) => {
    return (
        <Fragment>
            <Form initial={{name: ''}}
                  validationSchema={validationSchema_newRoom}
                  input={[{text: 'name'}]}
                  onSubmit={(value) => onSubmit(value)}/>
        </Fragment>
    )
};