import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});