import React, {Fragment} from "react";
import {Field, useField} from "formik";
import {makeCamelCaseFromString} from "../makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../makeFirstLetterUppercase";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

function SelectWithFormik(props) {
    // this will return field props for an <input />
    const [field, meta] = useField(props.name);
    const animatedComponents = makeAnimated();
    return (<>
            <Select
                className={props.className}
                isMulti
                options={props.options}
                components={animatedComponents}
            />
            {meta.error && <div>{meta.error}</div>}
        </>
    );
}

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


    return (<div key={placeholder}
                 className='form__field form__field__container'>
        {props.as
            ? <SelectWithFormik
                className={inputClassName}
                options={input.options}
                name={name}
            />
            : <>
                <Field
                    type={props.type}
                    className={inputClassName}
                    name={name}
                    placeholder={placeholder}
                />
                {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
            </>}
    </div>)
}
