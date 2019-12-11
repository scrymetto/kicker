import React, {Fragment} from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import {CustomField_Select} from "./__customField_select/field__cusromField_select";

import {makeCamelCaseFromString} from "../../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";

export function CustomField({input, initialValues, errors, touched, setFieldValue}) {
    const type = Object.keys(input)[0];
    const name = makeCamelCaseFromString(input[type]);
    const placeholder = makeFirstLetterUppercase(input[type]);

    let inputProps = {};

    if (type === 'select') {
        inputProps.as = "select";
    } else inputProps.type = type;

    const inputClassName = (errors[name] && touched[name])
        ? 'form__field form__field_error'
        : 'form__field';

    return (
        <div className='form__field form__field__container'>

            {inputProps.as
                ? <Fragment>
                    <CustomField_Select
                        className={inputClassName + ' select'}
                        classNamePrefix={'form__field'}
                        options={input.options}
                        name={name}
                        initialValues={initialValues[name]}
                        setFieldValue={setFieldValue}
                        placeholder={placeholder}
                        isSearchable={input.isSearchable}
                    />
                    {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
                </Fragment>
                : <Fragment>
                    <Field
                        type={inputProps.type}
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
    input: function (props, propName) {
        const prop = props[propName];
        if (!prop) {
            return new Error(`Prop \'${propName}\' is required.`)
        }
        if (props['input'].select) {
            if (!props['input'].options) {
                return new Error(`Prop \'${propName}\' must be an object, the field 'options' is required.`)
            } else {
                if (!Array.isArray(props['input'].options)) {
                    return new Error(`Field 'options' in prop \'${propName}\' must be an array.`)
                }
            }
            if (!props['input'].isSearchable) {
                return new Error(`Prop \'${propName}\' must be an object, the field 'isSearchable' is required.`)
            } else {
                if (typeof props['input'].isSearchable !== 'boolean') {
                    return new Error(`Field 'isSearchable' in prop \'${propName}\' must be a boolean.`)
                }
            }
        }
    },
    initialValues: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    errors: PropTypes.object.isRequired, // from Formik
    touched: PropTypes.object.isRequired, // from Formik
    setFieldValue: function (props, propName) {
        const prop = props[propName];
        if (props['input'].select) {
            if (!prop) {
                return new Error(`Prop \'${propName}\' is required for inputs with a select.`)
            }
        }
    } // fn from Formik
};