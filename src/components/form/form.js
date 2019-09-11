import React from "react";
import './form.css';
import './__field/__field.css';
import {Field, Formik, Form as FormikForm} from "formik";
import {Button} from "../button/button";

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
                (<FormikForm className='form'>
                    {
                        input.map((input) => {
                            let type = Object.keys(input);
                            let placeholder = input[type][0].toUpperCase() + input[type].slice(1);

                            return (<div key={placeholder}
                                         className='form__field'>
                                <Field
                                    type={type}
                                    name={placeholder}
                                    placeholder={placeholder}
                                    {...props}/>
                                {errors[type] && touched[type] && <div className='text text_error'>{errors[type]}</div>}
                            </div>)

                        })
                    }
                    <Button text='Submit' type='submit' className='button' disabled={isSubmitting}/>
                </FormikForm>)}
        </Formik>
    )
};