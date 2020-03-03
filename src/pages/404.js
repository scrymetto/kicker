import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

import {Card} from "../components/card/card";
import {Button} from "../components/button/button";

import '../components/container/grid_1-1.css'

const styleMargin10 = {margin: '10px auto'};
const styleMarginAuto = {margin:"auto"};
const styleEmoji = {fontSize: '5em', margin:"auto"};

export const Page404 = () => {
    const [onclick, setOnclick] = useState(false);
    return <Card headerText='Oooooops...'
                 render={() =>
                     <>
                         {onclick && <Redirect to="/rooms"/>}
                         <div className='container grid_1-1'>
                             <p className='text' style={styleEmoji}>&#129335;</p>
                             <p className='text' style={styleMarginAuto}>This page doesn't exist.</p>
                         </div>
                         <Button className='button'
                                 text='Go to home page'
                                 onClick={() => setOnclick(true)}
                                 style={styleMargin10}
                         />
                     </>
                 }/>
};