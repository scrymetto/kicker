import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.array().of(Yup.string().min(1))
        .required('Please, select at least one player.'),
    teamTwo: Yup.array().of(Yup.string().min(1))
        .required('Please, select at least one player.')
});

export const validationSchema_newGame__scores = Yup.object().shape({
    teamOne: Yup.number(),
    teamTwo: Yup.number(),
});