import React, {Fragment} from "react";
import {Field} from "formik";
import {makeCamelCaseFromString} from "../../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";
import PropTypes from "prop-types";
import {CustomField_Select} from "./field__cusromField_select";

export function CustomField({input, errors, touched, setFieldValue, initialValues}) {
    const type = Object.keys(input)[0];
    const name = makeCamelCaseFromString(input[type]);

    let props = {};
    const placeholder = makeFirstLetterUppercase(input[type]);

    if (type === 'select') {
        props.as = "select";
    } else props.type = type;

    let inputClassName = (errors[name] && touched[name])
        ? 'form__field form__field_error'
        : 'form__field';


    return (
        <div className='form__field form__field__container'>

            {props.as
                ? <Fragment>
                    <CustomField_Select
                        className={inputClassName + ' select'}
                        classNamePrefix={'form__field'}
                        options={input.options}
                        name={name}
                        initialValues={initialValues[name]}
                        setFieldValue={setFieldValue}
                        placeholder={placeholder}
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