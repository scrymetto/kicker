import React from 'react';
import '../App.css';
import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {useGlobal} from "../store"

export function Rooms() {

    let [globalState, globalActions] = useGlobal();
    let newRoom = {name: 'yep', id:'123'};
    console.log(globalState)
    console.dir(globalActions)
    let you = () => {
        console.log('you');
        globalActions.addNewRoom(newRoom);
    }
    return (
        <div className="App">
            <Card headerText='Your rooms'
                  render={() => (
                      <div>
                          {/*listener: {newListener.blah}*/}
                          <Button text='Hey' className='button' onClick={you}/>
                      </div>
                  )}
            />
        </div>
    )
}