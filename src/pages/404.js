import React, {Fragment} from 'react';
import {Redirect} from "react-router-dom";

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";

export const Page404 = () => {
    return <Card headerText='Oooooops...'
                 render={() =>
                     <Fragment>
                         <div>
                             <p></p>
                             <p className='text'>This page doesn't exist.</p>
                         </div>
                         <Button className='button' text='Go to home page' onClick={()=><Redirect to="/rooms"/>}/>
                     </Fragment>
                 }/>
};