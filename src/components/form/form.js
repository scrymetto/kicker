import React from "react";
import './form.css';
import './__field/__field.css';
import {Field, Formik, Form as FormikForm} from "formik";
import {Button} from "../button/button";

export const Form = ({initialShort, initialLong, input, validationSchemaShort, validationSchemaLong, ...props}) => {
    let isFormShort = input.findIndex(field => field.visible === false);
    let initialValues = isFormShort >= 0 ? initialShort : initialLong;
    let validationSchema = isFormShort >= 0 ? validationSchemaShort : validationSchemaLong;

    return (
        <Formik initialValues={initialValues}
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
                            let {visible, mutable} = input;
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
                            let className = visible
                                ? mutable
                                    ? 'form__field form__field_visible mutable'
                                    : 'form__field form__field_visible'
                                : mutable
                                    ? 'form__field form__field_hidden mutable'
                                    : 'form__field form__field_hidden';

                            return (<div key={placeholder}
                                         className={className}
                            >
                                {errors[name] && touched[name] && <p className='text text_error'>{errors[name]}</p>}
                                <Field
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}/>
                            </div>)
                        })
                    }
                    <Button text='Submit' type='submit' className='button' disabled={isSubmitting}/>
                </FormikForm>)}
        </Formik>
    )
};