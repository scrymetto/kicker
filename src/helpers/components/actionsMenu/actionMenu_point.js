import React from 'react';

import '../../../components/container/grid_7-1.css';
import '../../../components/text/text_additional.css'
import '../../../components/text/text_bold.css'
import {Button} from "../../../components/button/button";

export const Point = ({text, hint, emoji, onClick}) => {
    return <>
        <div className='container grid_7-1'>
            <div>
                <p className='text text_bold'>
                    {text}
                </p>
                <p className='text text_additional'>
                    {hint}
                </p>
            </div>
            <Button className='button' text={emoji} onClick={onClick}/>
        </div>
    </>
};