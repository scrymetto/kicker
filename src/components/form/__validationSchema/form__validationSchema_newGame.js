import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.array().of(Yup.object())
        .required('Please, select at least one player.'),
    teamTwo: Yup.array().of(Yup.object()).test(
        'match',
        'You can\'t play with yourself, choose another player!',
        function (teamTwo) {
            let teamOneObj = {};
            const teamOne = this.resolve(Yup.ref('teamOne'));
            teamOne.forEach(value => {
                teamOneObj[value.value] = true
            });
            for (let i = 0; i < teamTwo.length; i++) {
                if (teamOneObj[teamTwo[i].value]) {
                    return false
                }
            }
            return true
        })
        .required('Please, select at least one player.')
});

export const validationSchema_newGame__scores = Yup.object().shape({
    teamOne: Yup.object().nullable(),
    teamTwo: Yup.object().nullable().test(
        'match',
        'You can\'t finish the game with these results!',
        function (teamTwo) {
            const teamOne = this.resolve(Yup.ref('teamOne'));
            return !(teamOne === null && teamTwo === null);
        }
    ),
});