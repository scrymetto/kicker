import * as Yup from 'yup';

export const validationSchema_newGame__name = Yup.object().shape({
    teamOne: Yup.string(),
    teamTwo: Yup.string(),
});

export const validationSchema_newGame__players = Yup.object().shape({
    teamOne: Yup.array().of(Yup.object())
        .required('Please, select at least one player.')
        .max(2,'You can select only 2 players per team.'),
    teamTwo: Yup.array().of(Yup.object()).test(
        'match',
        'You can\'t play with yourself, choose another player!',
        function (teamTwo) {
            let teamOneObj = {};
            const teamOne = this.resolve(Yup.ref('teamOne'));
            teamOne.forEach(selectOption => {
                teamOneObj[selectOption.value] = true // save the values of the other team in an obj
            });
            for (let i = 0; i < teamTwo.length; i++) {
                if (teamOneObj[teamTwo[i].value]) { // check, if the values of the other team were selected for this team
                    return false // if yes, return an error
                }
            }
            return true
        })
        .required('Please, select at least one player.')
        .max(2, 'You can select only 2 players per team.'),
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