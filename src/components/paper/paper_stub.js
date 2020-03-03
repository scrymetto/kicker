import React from 'react';
import './paper_stub.css'
import './paper.css'
import '../container/flex_row.css'
import '../text/text_additional.css'
import '../text/text_paper__header.css'

const maxCard = 3;
const papers = new Array(maxCard).fill(0, 0, maxCard).map((value, index) => value + index);

export const StubPaper = () => {
    return (<>
            {papers.map((value) => {
                return <div key={value} className='paper'>
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
            })}
        </>
    )
};