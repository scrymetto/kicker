import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import {useGlobal} from "../store"
import {useAuth} from "../helpers/auth&route/authContext";
import {getRooms} from "../helpers/requests/getRooms";
import {postRooms} from "../helpers/requests/postRoom";
import {deleteRoom} from "../helpers/requests/deleteRoom";
import {setErrorPopup} from "../helpers/setErrorPopup";
import {scrollToTop} from "../helpers/scrollToTop";
import {validationSchema_newRoom} from "../components/form/__validationSchema/form__validationSchema_newRoom";

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";
import {Form_simple} from "../components/form/form_simple/_simple";
import {RoomsList} from "../helpers/components/roomsList";
import {StubPaper} from "../components/paper/paper_stub";
import {ErrorComponent} from "../helpers/components/errorComponent";

const initial = {name: ''};

export function Rooms(props) {

    const {user} = useAuth();
    const [isUploaded, setUploaded] = useState({loading: true, error: false, done: false});
    const [redirect, doRedirect] = useState(false);

    useEffect(() => {
        getRooms(user)
            .then(data => {
                getSuccess(data)
            })
            .catch(e => {
                onError(e)
            });
        props.history.push(props.history.location);
    }, []);

    const [globalState, globalActions] = useGlobal();
    const rooms = globalState.rooms;

    const onError = (e) => {
        setErrorPopup(e, globalActions.setPopup);
        setUploaded({loading: false, error: true, done: false})
    };
    const getSuccess = (rooms) => {
        globalActions.addStateFromServer(rooms, 'rooms');
        setUploaded({loading: false, error: false, done: true})
    };

    const [isFormVisible, setFormVisible] = useState(false);

    const createNewRoomForm = () => {
        scrollToTop();
        setFormVisible(true);
    };

    const createNewRoom = (values) => {
        postRooms(user, values)
            .then((data) => {
                globalActions.addNewInState(data, 'rooms');
                doRedirect(data.id)
            })
            .then(() => {
                globalActions.setPopup({success: '🎉 Success! Let\'s add new players!'}); //&#127881;
            })
            .catch((e) => onError(e))
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    // const deleteRoomFromState = id => {
    //     deleteRoom(user, id)
    //         .then(() => {
    //             globalActions.deleteFromState(id, 'rooms')
    //         })
    //         .then(() => globalActions.setPopup({success: '♻ The room has been deleted!'}))
    //         .catch(e => {
    //             onError(e)
    //         });
    // };

    return (
        <Card headerText='Your rooms'
              render={() => (
                  <>
                      {redirect && <Redirect to={`/rooms/${redirect}`}/>}
                      {isFormVisible
                          ? <Form_simple onSubmit={createNewRoom}
                                         close={closeForm}
                                         initial={initial}
                                         input={'name'}
                                         validationSchema={validationSchema_newRoom}
                          />
                          :
                          !isUploaded.error &&
                          <CSSTransition timeout={300} classNames='button_animation' in={!isFormVisible} appear={true}>
                              <Button className='button button_new' onClick={createNewRoomForm}/>
                          </CSSTransition>}
                      {isUploaded.loading && <StubPaper/>}
                      {isUploaded.done && <RoomsList rooms={rooms}
                                                     // deleteRoom={deleteRoomFromState}
                      />}
                      {(isUploaded.done && !rooms[0]) &&
                      <div className='margin_15'><p className='text'>
                          You don't have any room. Let's create the very first one!</p></div>}
                      {isUploaded.error && <ErrorComponent/>}
                  </>
              )}
        />
    )
}