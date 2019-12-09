import React from 'react';
import PropTypes from 'prop-types';

import './players.css'

export const Players = (props) => {
    const {players} = props;
    if (players.length !== 0) {
        return (
            <div className='players'>
                <p className='text text_additional'>Players: </p>
                {
                    players.map(player => {
                        return (<p key={player.id}
                                   className='text text_additional'>{player.nickname || player.id}</p>)
                    })
                }
            </div>
        )
    } else {
        return <div className='players'>
            <p className='text text_additional'>There are no players yet.</p>
        </div>
    }
};

Players.propTypes = {
    players: PropTypes.array
};