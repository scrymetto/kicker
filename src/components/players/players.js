import React from 'react';
import PropTypes from 'prop-types';

import './players.css'

const style = {marginRight:'3px'};

export const Players = (props) => {
    const {players} = props;
    if (players.length !== 0) {
        return (
            <div className='players'>
                <p className='text text_additional' style={style}>Players:</p>
                {
                    players.map((player, index) => {
                        return (<p key={player.id}
                                   className='text text_additional'
                                   style={style}
                        >{(player.nickname || player.id) + (index===players.length-1 ? '' : ',')}</p>)
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
    players: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
        nickname: PropTypes.string
    }))
};