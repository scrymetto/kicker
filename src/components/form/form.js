import React from "react";
import './form.css';
import './__field/__field.css';
import '../text/text_error.css'
import {Field, Formik, Form as FormikForm} from "formik";
import {Button} from "../button/button";
import PropTypes from "prop-types";
import {makeCamelCaseFromString} from "../../helpers/makeCamelCaseFromString";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";

export const Form = ({initial, input, validationSchema, ...props}) => {
    return (
        <Formik initialValues={initial}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 2000);
                }}
                validationSchema={validationSchema}>
            {({errors, touched, isSubmitting}) =>
                (<FormikForm className='form'  {...props}>
                    {input.map((input) => {
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
                    })
                    }
                    <Button text='Submit' type='submit' className='button' disabled={isSubmitting}/>
                </FormikForm>)}
        </Formik>
    )
};

Form.propTypes = {
    initial: PropTypes.object.isRequired,
    validationSchema: PropTypes.object.isRequired,
    input: PropTypes.array.isRequired
};