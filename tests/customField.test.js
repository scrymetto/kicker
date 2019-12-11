import React from "react";
import {act, render, cleanup, prettyDOM} from "@testing-library/react";

import {CustomField} from "../src/components/form/__field/field__customField";
import {CustomField_Select} from "../src/components/form/__field/__customField_select/field__cusromField_select";

const textInitial = {

};

const selectInput = {
    select: 'colors',
    options: ['s'],
    isSearchable:true,
}

const selectInitial = {
    colors: 'blue'
}

const makeFlag = (obj, trueOrFalse) =>{
    let newObj = {};
    for (let key in obj) {
        newObj[key] = trueOrFalse;
    }
    return newObj
};

describe('CustomField ', ()=>{
    afterEach(cleanup);
    test('should render a text input, if there is no field \'select\' in prop \'input\'', ()=>{
        const {container, getByTestid} = render(<CustomField initialValues={selectInitial}
                                                             errors={makeFlag(selectInitial, false)}
                                                             touched={makeFlag(selectInitial, false)}
                                                             setFieldValue={()=>true}
                                                             input={selectInput}/>)
        console.log(prettyDOM(container))
    })
});