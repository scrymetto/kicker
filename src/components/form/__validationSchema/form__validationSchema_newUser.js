import * as Yup from 'yup';

export const validationSchema_newUser = Yup.object().shape({
    login: Yup.string(),
    email: Yup.string()
        .email('Invalid email.')
        .required('Email is required.'),
    password: Yup.string()
        .required('Password is required.'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match.")
        .required('Please, repeat the password.')
});