import React from "react";
import {Link} from "react-router-dom";

import {Paper} from "../../components/paper/paper";

export const RoomsList = ({rooms, deleteRoom}) => {
    return <>
        {rooms.map(room => {
            const {id, players, name} = room;
            const admin = room.creator.nickname || room.creator.email;
            return <div key={id} style={{position: 'relative'}}>
                <Link to={`rooms/${id}`}>
                    <Paper
                        players={players}
                        name={name}
                        admin={admin}
                    />
                </Link>
                {/*<Button className='button button_close'*/}
                {/*        onClick={() => deleteRoom(id)}*/}
                {/*        style={{position: 'absolute', top: '10px', right: '10px'}}*/}
                {/*/>*/}
            </div>
        })}
    </>
};
