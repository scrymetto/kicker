import * as Yup from 'yup';

export const validationSchema_newUser = Yup.object().shape({
    login: Yup.string(),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required('Required')
});