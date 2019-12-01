import React, {Fragment} from "react";
import {Field, useField} from "formik";
import {makeCamelCaseFromString} from "../makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../makeFirstLetterUppercase";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

function SelectWithFormik(props) {
    const [field, meta] = useField(props);
    console.dir(meta)
    const animatedComponents = makeAnimated();
    return (<Fragment>
            <Select
                {...field}
                className={props.className}
                isMulti
                options={props.options}
                components={animatedComponents}
                name={props.name}
            />
            {meta.error && <div>{meta.error}</div>}
        </Fragment>
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
            : <Fragment>
                <Field
                    type={props.type}
                    className={inputClassName}
                    name={name}
                    placeholder={placeholder}
                />
                {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
            </Fragment>}
    </div>)
}
