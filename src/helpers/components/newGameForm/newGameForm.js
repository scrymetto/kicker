import React, {Fragment} from "react";
import {Card} from "../../../components/card/card";
import {Button} from "../../../components/button/button";

export const NewGameForm = (props) => {
    return <Fragment>
        <Card/>
        <Button
            className='button button_back'
            onClick={props.history.goBack}/>
    </Fragment>
};