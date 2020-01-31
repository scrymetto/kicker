import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.array()/*.of(Yup.object()).min(1)
        .required('Please, select at least one player.')*/,
    teamTwo: Yup.array()/*.of(Yup.object()).min(1).test(
        'match',
        'You can\'t play with yourself, choose another player!',
        function (value) {
            for (let i = 0; i < value.length; i++) {
                if (this.resolve(Yup.ref('teamOne')).includes(value[i])) return false
            }
            return true
        })
            .required('Please, select at least one player.')*/
});

export const validationSchema_newGame__scores = Yup.object().shape({
    teamOne: Yup.object(),
    teamTwo: Yup.object(),
});