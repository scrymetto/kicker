import React from "react";
import PropTypes from "prop-types";
import {Formik, Form as FormikForm} from "formik";

import {Button} from "../button/button";
import {CustomField} from "./__field/field__customField";
import './form.css';
import './__field/__customField_select/field__customField.css';
import '../text/text_error.css'

//TODO: do we need setSubmitting()?

export const Form = ({initial, inputs, validationSchema, onSubmit, ...other}) => {
    let formikSubmit = (values, {setSubmitting, resetForm}) => {
        resetForm();
        onSubmit(values);
    };

    return (
        <Formik initialValues={initial}
                onSubmit={(values, {setSubmitting, resetForm}) => formikSubmit(values, {setSubmitting, resetForm})}
                validationSchema={validationSchema}
        >
            {(props) => {

                return (<FormikForm className={other.className}>
                    {inputs.map((input, index) => <CustomField
                        key={index}
                        input={input}
                        errors={props.errors}
                        touched={props.touched}
                        setFieldValue={props.setFieldValue}
                        initialValues={initial}/>
                    )}
                    {other.withRoundButton
                        ? <Button type='submit' className='button button_next' disabled={props.isSubmitting}/>
                        : <Button text='Submit' type='submit' className='button' disabled={props.isSubmitting}/>
                    }
                </FormikForm>)
            }}
        </Formik>
    )

};

Form.propTypes = {
    className:PropTypes.string,
    initial: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    validationSchema: PropTypes.object.isRequired, // all inputs with Yup.object()
    inputs: PropTypes.arrayOf(PropTypes.object).isRequired, // [{key: type of input for Formik, value: name of input}, ...]
    onSubmit: PropTypes.func.isRequired,
    withRoundButton:PropTypes.bool
};