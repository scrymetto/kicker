import React from "react";
import PropTypes from "prop-types";
import {Formik, Form as FormikForm} from "formik";

import {Button} from "../button/button";
import {renderInputFieldWithProps} from "../../helpers/renderComponents/renderInputFieldWithProps";
import './form.css';
import './__field/__field.css';
import '../text/text_error.css'

export const Form = ({initial, input: inputs, validationSchema, onSubmit, ...props}) => {
    let formikSubmit = (values, {setSubmitting, resetForm}) => {

        onSubmit(values);
        setSubmitting(true);
        setTimeout(setSubmitting, 0, false);
        setTimeout(resetForm, 0);
    };

    return (
        <Formik initialValues={initial}
                onSubmit={(values, {setSubmitting, resetForm}) =>formikSubmit(values, {setSubmitting, resetForm})}
                validationSchema={validationSchema}>
            {({errors, touched, isSubmitting}) =>
                (<FormikForm className='form'  {...props}>
                    {inputs.map(input => renderInputFieldWithProps(input, errors, touched))}
                    <Button text='Submit' type='submit' className='button' disabled={isSubmitting}/>
                </FormikForm>)}
        </Formik>
    )
};

Form.propTypes = {
    initial: PropTypes.object.isRequired,
    validationSchema: PropTypes.object.isRequired, // all inputs with Yup.object()
    input: PropTypes.array.isRequired, // [{key: type of input for Formik, value: name of input}, ...]
};