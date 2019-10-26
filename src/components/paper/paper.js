import React from 'react';
import PropTypes from 'prop-types';
import './paper.css'
import '../text/text_additional.css'
import '../text/text_paper__header.css'

import {Players} from '../players/players'

export const Paper = (props) => {
    const {admin, name, players} = props;
    return (
        <div className='paper'>
            <p className='text text_additional'>Admin of this room: {admin}</p>
            <h2 className='text text_paper__header'>{name}</h2>
            <Players players={players}/>
        </div>
    )
};

Paper.propTypes = {
    admin: PropTypes.string,
    name: PropTypes.string,
    players: PropTypes.array
};