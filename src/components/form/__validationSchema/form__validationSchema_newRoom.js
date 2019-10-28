import * as Yup from 'yup';

export const validationSchema_newRoom = Yup.object().shape({
    name: Yup.string()
        .required('Name is required.'),
});