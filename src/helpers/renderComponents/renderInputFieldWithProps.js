import React from "react";
import {Field} from "formik";
import {makeCamelCaseFromString} from "../makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../makeFirstLetterUppercase";

export function renderInputFieldWithProps(input, errors, touched) {
        let type = Object.keys(input)[0];
        let name = makeCamelCaseFromString(input[type]);
        let placeholder = makeFirstLetterUppercase(input[type]);
        let inputClassName = (errors[name] && touched[name])
            ? 'form__field form__field_error'
            : 'form__field';

        return (<div key={placeholder}
                     className='form__field form__field__container'>
            <Field
                className={inputClassName}
                type={type}
                name={name}
                placeholder={placeholder}/>
            {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
        </div>)
}
