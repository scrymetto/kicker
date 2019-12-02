import React, {Fragment} from "react";
import {Field, useField} from "formik";
import {makeCamelCaseFromString} from "../../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import PropTypes from "prop-types";

export function CustomField({input, errors, touched, setFieldValue, value}) {
    const animatedComponents = makeAnimated();
    console.log(value)
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


    return (
        <div className='form__field form__field__container'>

            {props.as
                ? <Fragment>
                    <Select
                        className={inputClassName + ' select'}
                        classNamePrefix={'form__field'}
                        options={input.options}
                        name={name}
                        value={value[name]}
                        onChange={value => {
                            setFieldValue(name, value)
                        }}
                        isMulti
                        components={animatedComponents}
                    />
                    {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
                </Fragment>
                : <Fragment>
                    <Field
                        type={props.type}
                        className={inputClassName}
                        name={name}
                        placeholder={placeholder}
                        onChange={event => setFieldValue(name, event.target.value)}
                    />
                    {errors[name] && touched[name] && <p className='text text_error'>{errors[name]}</p>}
                </Fragment>
            }
        </div>)
}

CustomField.propTypes = {
    input: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    touched: PropTypes.object.isRequired, // all inputs with Yup.object()
    setFieldValue: PropTypes.func.isRequired
};