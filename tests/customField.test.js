import React from "react";
import {act, render, cleanup, prettyDOM} from "@testing-library/react";

import {CustomField} from "../src/components/form/__field/field__customField";



const selectInput = {
    select: 'colors',
    options: ['s'],
    isSearchable:true,
}

const selectInitial = {
    colors: []
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
        const {container, getByTestid} = render(<CustomField initialValues={textInitial}
                                                             errors={makeFlag(textInitial, false)}
                                                             touched={makeFlag(textInitial, false)}
                                                             input={textInput}
                                                             setFieldValue={()=>true}
        />)
        console.log(prettyDOM(container))
    })
});