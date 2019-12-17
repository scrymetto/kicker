import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {Card} from "../../../components/card/card";
import {useGlobal} from "../../../store";
import {Button} from "../../../components/button/button";
import {Form_simple} from "../../../components/form/form_simple/newRoomForm";

const ActionsMenu = () => {

    const [globalState, globalActions] = useGlobal();
    const room = globalState.rooms.find((room) => room.id === props.match.params.roomId);

    const [form, openForm] = useState(false)

    return <CSSTransition>
        <div className='container absolute'>
            <Card headerText={`Actions for ${room.name}`}
                  render={() => {
                      return <Fragment>
                          {form && <Form_simple/>}
                          <Button className='button' text='Add player' onClick={() => openForm(true)}/>
                      </Fragment>
                  }}/>
        </div>
    </CSSTransition>
};
export default ActionsMenu;