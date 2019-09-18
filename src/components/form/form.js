import React from "react";
import {Formik, Form as FormikForm} from "formik";
import PropTypes from "prop-types";

import {Button} from "../button/button";
import {renderInputFieldWithProps} from "../../helpers/renderInputFieldWithProps";
import './form.css';
import './__field/__field.css';
import '../text/text_error.css'

export const Form = ({initial, input: inputs, validationSchema, ...props}) => {
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
                    {inputs.map(input => renderInputFieldWithProps(input, errors, touched))}
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