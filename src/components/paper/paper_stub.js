import React from 'react';
import './paper_stub.css'
import '../container/flex_row.css'


export const StubPaper = () => {
    return (
        <div className='paper'>
            <div className='container flex_row'>
                <p className='text text_additional'>Admin of this room: </p>
                <div className='stub'/>
            </div>
            <div className='stub_header'/>
            <div className='container flex_row'>
                <p className='text text_additional'>Players: </p>
                <div className='stub'/>
            </div>
        </div>
    )
};