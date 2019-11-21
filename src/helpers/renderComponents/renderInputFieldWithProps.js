import React from "react";
import {Field} from "formik";
import {makeCamelCaseFromString} from "../makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../makeFirstLetterUppercase";

export function renderInputFieldWithProps(input, errors, touched) {
    console.log(input)
    let props = {};
    const type = Object.keys(input)[0];
    if(type === 'select'){
        props.as='select';
    } else props.type=type;
    let name = makeCamelCaseFromString(input[type]);
    let placeholder = makeFirstLetterUppercase(input[type]);
    let inputClassName = (errors[name] && touched[name])
        ? 'form__field form__field_error'
        : 'form__field';

    return (<div key={placeholder}
                 className='form__field form__field__container'>
        <Field
            className={inputClassName}
            name={name}
            // placeholder={placeholder}
            {...props}>
            {props.as && <option  value={'res'}>res</option>
            }
        </Field>
        {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
    </div>)
}
