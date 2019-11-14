import {prepareStringWithPlayers} from "../src/helpers/prepareStringWithPlayers";

const atlasShrugged = [
    {},
    {
        id: 0,
        name: 'Dagny Taggart',
        function: 'Vice-President of Taggart Transcontinental'
    },
    {
        id: 1,
        name: 'John Galt',
        function: 'Engineer for the Motor Company'
    },
    {},
    {
        id: 2,
        name: 'Henry "Hank" Rearden'
    },
    {},
    {
        id:3,
        name: 'Lillian Rearden'
    }
];

describe('prepareStringWithPlayers()', () => {
    let result = prepareStringWithPlayers(atlasShrugged);
    it('should return a string', () => {
        expect(typeof result).to.equal('string')
    });
    it('should return all names', () => {
        atlasShrugged.forEach((person, index) => {
            let playerName = !!person.name;
            let substr = result.includes(person.name);
            expect(substr).to.equal(playerName)
        })
    });
    it('should return function of the players', () => {
        atlasShrugged.forEach(person => {
            let substr = result.includes(person.function);
            let playerFunc = !!person.function;
            expect(substr).to.equal(playerFunc)
        })
    });
    it('should return a correct count of commas', () => {
        let necessaryCommas = 0;
        let dataPerson=0;
        atlasShrugged.forEach((person, index) => {
            if (person.name) {
                if (dataPerson !== 0) {
                    necessaryCommas += 1;
                    dataPerson += 1;
                } else dataPerson += 1
            }
        });
        let commas = 0;
        for (let i=0; i<result.length; i++){
            if (result[i] ===','){
                commas++
            }
        }
        expect(necessaryCommas).to.equal(commas)
        expect(result[result.length-1]).to.not.equal(',');
        expect(result[result.length-2]).to.not.equal(',')
    })
});