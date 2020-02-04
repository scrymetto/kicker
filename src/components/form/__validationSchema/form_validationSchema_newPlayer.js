import * as Yup from 'yup';

export const form_validationSchema_newPlayer = Yup.object().shape({
    name: Yup.string()
        .required('Name is required.'),
});