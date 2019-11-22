import React from "react";
import {Field} from "formik";
import {makeCamelCaseFromString} from "../makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../makeFirstLetterUppercase";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

export function renderInputFieldWithProps(input, errors, touched) {
    let props = {};
    const type = Object.keys(input)[0];
    if (type === 'select') {
        props.as = "select";
    } else props.type = type;
    let name = makeCamelCaseFromString(input[type]);
    let placeholder = makeFirstLetterUppercase(input[type]);
    let inputClassName = (errors[name] && touched[name])
        ? 'form__field form__field_error'
        : 'form__field';
    const animatedComponents = makeAnimated();


    return (<div key={placeholder}
                 className='form__field form__field__container'>
        {props.as
            ? <Select
                closeMenuOnSelect={true}
                isMulti
                options={input.options}
                components={animatedComponents}
            />
            : <Field
                type={props.type}
                className={inputClassName}
                name={name}
                placeholder={placeholder}
            />}
        {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
    </div>)
}
