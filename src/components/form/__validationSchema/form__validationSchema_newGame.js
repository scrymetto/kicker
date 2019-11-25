import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string()
        .required('Email is required.'),

    teamTwo: Yup.string()
    .required('Email is required.'),

});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.array()
        .required('Email is required.'),
    teamTwo: Yup.string()
        .required('Email is required.')
});
