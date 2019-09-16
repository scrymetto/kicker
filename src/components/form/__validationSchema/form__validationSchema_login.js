import * as Yup from 'yup';

export const validationSchema_login = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Email is required.'),
    password: Yup.string()
        .required('Password is required.'),
});