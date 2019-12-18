import React, {Fragment, useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {Card} from "../../../components/card/card";
import {useGlobal} from "../../../store";
import {Button} from "../../../components/button/button";
import {Form_simple} from "../../../components/form/form_simple/_simple";
import {validationSchema_newPlayer} from "../../../components/form/__validationSchema/validationSchema_newPlayer";

const ActionsMenu = ({room}) => {

    const [globalState, globalActions] = useGlobal();

    const [form, openForm] = useState(false);

    const addNewPlayer = name => {
        console.log(name)
        openForm(false)
    };

    return <CSSTransition>
        <div className='container absolute'>
            <Card headerText={`Actions for ${room.name}`}
                  render={() => {
                      return <Fragment>
                          {form && <Form_simple
                              initial={{name: ''}}
                              input='name'
                              onSubmit={addNewPlayer}
                              goBack={()=>openForm(false)}
                              status={form}
                              validationSchema={validationSchema_newPlayer}
                          />}
                          <Button className='button' text='Add player' onClick={() => openForm(true)}/>
                      </Fragment>
                  }}/>
        </div>
    </CSSTransition>
};
export default ActionsMenu;