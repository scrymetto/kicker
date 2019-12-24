import React, {Fragment} from 'react';
import './paper_stub.css'
import './paper.css'
import '../container/flex_row.css'
import '../text/text_additional.css'
import '../text/text_paper__header.css'


export const StubPaper = () => {
    return (<Fragment>
            {[1, 2, 3].map((value) => {
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
        </Fragment>
    )
};