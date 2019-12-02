import React, {Fragment, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import {postRooms} from "../helpers/requests/postRoom";
import {scrollToTop} from "../helpers/scrollToTop";

import {Card} from "../components/card/card";
import {Paper} from "../components/paper/paper";
import {Button} from "../components/button/button";
import {NewRoomFrom} from "../helpers/components/newRoomForm/newRoomForm";
import {StubPaper} from "../components/paper/paper_stub";

import '../components/button/button_new.css'

//TODO: change height of card if <NewRoomForm/> is open!

export function Rooms(props) {

    const {user} = useAuth();
    let [isUploaded, setUploaded] = useState({loading: true, error: false, done: false});
    let [newRoom, createNewRoom] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            getRooms(user, getSuccess, onError)
                .then(() => {
                    setUploaded({loading: false, error: false, done: true});
                });
        }, 1000);
        props.history.push(props.history.location)
    }, []);

    let [globalState, globalActions] = useGlobal();
    let rooms = globalState.rooms;
    const onError = (e) => {
        setUploaded({loading: false, error: true, done: false});
        globalActions.setPopup({error: e})
    };
    const getSuccess = (rooms) => globalActions.addRoomsFromServer(rooms);


    let [isFormVisible, setFormVisible] = useState(false);
    let [isFormOpening, openForm] = useState(false);

    const createNewRoomForm = () => {
        scrollToTop();
        openForm(true);
        setFormVisible(true);
    };

    const onSubmitForm = (values) => {
        postRooms(user, values, onError)
            .then((data) => {
                globalActions.addNewRoom(data);
                createNewRoom(data.id)
            })
            .then(() => {
                globalActions.setPopup({success: 'Success! Let\'s create a new game!'});
            })
            .catch((e) => onError(e))
    };

    const goBack = () => {
        openForm(false);
        setTimeout(setFormVisible, 300, false);
    };

    return (
        <Card headerText='Your rooms'
              render={() => (
                  <Fragment>
                      {newRoom && <Redirect to={`rooms/${newRoom}`}/>}
                      {isFormVisible
                          ? <NewRoomFrom onSubmit={onSubmitForm} goBack={goBack} status={isFormOpening}/>
                          :
                          <CSSTransition timeout={300} classNames='button_animation' in={!isFormVisible} appear={true}>
                              <Button className='button button_new' onClick={createNewRoomForm}/>
                          </CSSTransition>}
                      {isUploaded.done && rooms.map(room => {
                          let {id, users, name, creatorId} = room;
                          return <Link key={id} to={`rooms/${id}`}>
                              <Paper
                                  className='paper'
                                  players={users}
                                  name={name}
                                  admin={creatorId}/>
                          </Link>
                      })}
                      {isUploaded.done && !rooms[0] &&
                      <div className='margin_15'><p className='text'>
                          You don't have any room. Let's create the very first one!</p></div>}
                      {isUploaded.loading && <Fragment>
                          {[1, 2, 3].map((number) => {
                              return <StubPaper key={number}/>
                          })}
                      </Fragment>}
                      {isUploaded.error &&
                      <div className='margin_15'><p className='text text_error'>Sorry, the server doesn't work. Please,
                          try later.</p></div>}
                  </Fragment>
              )}
        />
    )
}