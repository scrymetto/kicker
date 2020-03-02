import React from "react";
import {Field} from "formik";
import PropTypes from "prop-types";

import {CustomField_Select} from "./__customField_select/field__customField_select";

import {makeCamelCaseFromString} from "../../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";

export function CustomField({input, initialValues, errors, touched, setFieldValue, ...props}) {

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
                ? <>
                    <CustomField_Select
                        {...props}
                        className={inputClassName + ' select'}
                        options={input.options}
                        name={name}
                        initialValues={initialValues[name]}
                        setFieldValue={setFieldValue}
                        placeholder={placeholder}
                        isSearchable={input.isSearchable}
                    />
                    {errors[name] && touched[name] && <div className='text text_error'>{errors[name]}</div>}
                </>
                : <>
                    <Field
                        {...props}
                        type={inputProps.type}
                        className={inputClassName}
                        name={name}
                        placeholder={placeholder}
                        onChange={event => setFieldValue(name, event.target.value)}
                        data-testid='custom_input'
                    />
                    {errors[name] && touched[name] && <p className='text text_error'>{errors[name]}</p>}
                </>
            }
        </div>)
}

CustomField.propTypes = {
    input: function (props, propName) {
        const prop = props[propName];
        if (!prop) {
            return new Error(`Prop \'${propName}\' is required.`)
        }
        if (!prop.select) return;
        if (!prop.options) {
            return new Error(`Prop \'${propName}\' must be an object, the field 'options' is required.`)
        } else {
            if (!Array.isArray(prop.options)) {
                return new Error(`Field 'options' in prop \'${propName}\' must be an array.`)
            }
        }
        if (typeof prop.isSearchable === 'undefined') {
            return new Error(`Prop \'${propName}\' must be an object, the field 'isSearchable' is required.`)
        } else {
            if (typeof props['input'].isSearchable !== 'boolean') {
                return new Error(`Field 'isSearchable' in prop \'${propName}\' must be a boolean.`)
            }
        }

    },
    initialValues: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    errors: PropTypes.object.isRequired, // from Formik
    touched: PropTypes.object.isRequired, // from Formik
    setFieldValue: PropTypes.func.isRequired // fn from Formik
};