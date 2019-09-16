import React from "react";
import './form.css';
import './__field/__field.css';
import '../text/text_error.css'
import {Field, Formik, Form as FormikForm} from "formik";
import {Button} from "../button/button";
import PropTypes from "prop-types";

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
                    {
                        input.map((input) => {
                            let type = Object.keys(input)[0];
                            let name = input[type].split(' ');
                            if (name.length > 1) {
                                name = name.map((word, index) => {
                                    if (index !== 0) {
                                        return word[0].toUpperCase() + word.slice(1)
                                    } else return word;
                                });
                            }
                            name = name.join('');
                            let placeholder = input[type][0].toUpperCase() + input[type].slice(1);

                            return (<div key={placeholder}
                                         className='form__field'>
                                <Field
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