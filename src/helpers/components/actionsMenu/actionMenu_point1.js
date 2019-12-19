import React, {Fragment} from 'react';

import '../../../components/container/grid_7-1.css';
import '../../../components/text/text_additional.css'
import '../../../components/text/text_bold.css'
import {Button} from "../../../components/button/button";

export const Point1 = ({onClick}) => {
    return <Fragment>
        <div className='container grid_7-1'>
            <div>
                <p className='text text_bold'>
                    Add new player
                </p>
                <p className='text text_additional'>
                    Play with all your friends!
                </p>
            </div>
            <Button className='button' text='&#128111;' onClick={onClick}/>
        </div>
    </Fragment>
};