import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";

import '../components/container/grid_1-1.css'

export const Page404 = () => {
    const [onclick, setOnclick] = useState(false);
    return <Card headerText='Oooooops...'
                 render={() =>
                     <>
                         {onclick && <Redirect to="/rooms"/>}
                         <div className='container grid_1-1'>
                             <p className='text' style={{fontSize: '5em', margin:"auto"}}>&#129335;</p>
                             <p className='text' style={{margin:"auto"}}>This page doesn't exist.</p>
                         </div>
                         <Button className='button'
                                 text='Go to home page'
                                 onClick={() => setOnclick(true)}
                                 style={{margin: '10px auto'}}
                         />
                     </>
                 }/>
};