import React from 'react';
import '../App.css';
import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {useGlobal} from "../store"

export function Rooms() {

    let [globalState, globalActions] = useGlobal();
    // let rooms = globalState.state.rooms;
    console.log(globalState)
    let addNew = (room) => {
        globalActions.addNewRoom(room)
    }
    let room = {name: 'name'};
    return (
        <div className="App">
            <Card headerText='Your rooms'
                  render={() => (
                      <div>
                          <Button text='Hey' className='button' onClick={() => addNew(room)}/>
                      </div>
                  )}
            />
        </div>
    )
}