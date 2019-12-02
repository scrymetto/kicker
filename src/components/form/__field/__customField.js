import React, {Fragment} from "react";
import {Field, useField} from "formik";
import {makeCamelCaseFromString} from "../../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

function SelectWithFormik(props) {
    const [field, meta] = useField(props);
    const animatedComponents = makeAnimated();
    return (<Fragment>
            <Select
                className={props.className}
                isMulti
                options={props.options}
                components={animatedComponents}
                name={props.name}
                onChange={props.onChange}
            />
            {meta.error && <div>{meta.error}</div>}
        </Fragment>
    );
}

export function CustomField({input, errors, touched, setFieldValue}) {
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
                onChange={value => {
                    setFieldValue(name, value.map(option => option.value))
                }}
            />
            : <Fragment>
                <Field
                    type={props.type}
                    className={inputClassName}
                    name={name}
                    placeholder={placeholder}
                    onChange={event => setFieldValue(name, event.target.value)}
                />
                {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
            </Fragment>}
    </div>)
}
