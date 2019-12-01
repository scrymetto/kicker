import React from "react";
import PropTypes from "prop-types";
import {Formik, Form as FormikForm} from "formik";

import {Button} from "../button/button";
import {renderInputFieldWithProps} from "../../helpers/renderComponents/renderInputFieldWithProps";
import './form.css';
import './__field/__field.css';
import '../text/text_error.css'

//TODO: do we need setSubmitting()?

export const Form = ({initial, inputs, validationSchema, onSubmit, ...props}) => {
    let formikSubmit = (values, {setSubmitting, resetForm}) => {
        resetForm();
        onSubmit(values);
    };

    return (
        <Formik initialValues={initial}
                onSubmit={(values, {setSubmitting, resetForm}) => formikSubmit(values, {setSubmitting, resetForm})}
                validationSchema={validationSchema}>
            {({errors, touched, isSubmitting}) => {
                return (<FormikForm className='form'>
                    {inputs.map((input, index) => renderInputFieldWithProps(input, errors, touched))}
                    <Button text='Submit' type='submit' className='button' disabled={isSubmitting}/>
                </FormikForm>)
            }}
        </Formik>
    )

};

Form.propTypes = {
    initial: PropTypes.object.isRequired, // because of the 'uncontrolled input'- error
    validationSchema: PropTypes.object.isRequired, // all inputs with Yup.object()
    inputs: PropTypes.array.isRequired, // [{key: type of input for Formik, value: name of input}, ...]
    onSubmit: PropTypes.func.isRequired
};