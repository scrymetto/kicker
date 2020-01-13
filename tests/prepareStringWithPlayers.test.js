import {prepareStringWithPlayers} from "../src/helpers/prepareStringWithPlayers";

const atlasShruggedId = [
    {playerId: 'a'},
    {playerId: 'b'},
    {playerId: 'c'},
    {playerId: 'd'},
    {playerId: 'e'},
    {playerId: 'f'},
    {playerId: 'g'}
];
const atlasShruggedCharacters = {
    a: '',
    b: 'Dagny Taggart',
    // function: 'Vice-President of Taggart Transcontinental'
    c: 'John Galt',
    // function: 'Engineer for the Motor Company'
    d: '',
    e: 'Henry "Hank" Rearden',
    f: '',
    g: 'Lillian Rearden',
};

describe('prepareStringWithPlayers()', () => {
    const result = prepareStringWithPlayers(atlasShruggedId, atlasShruggedCharacters);
    it('should return a string', () => {
        expect(typeof result).to.equal('string')
    });
    it('should return all names', () => {
        atlasShruggedId.forEach(person => {
            const playerName = atlasShruggedCharacters[person.playerId];
            expect(result.includes(playerName)).to.equal(true)
        })
    });
    // it('should return function of the players', () => {
    //     atlasShrugged.forEach(person => {
    //         let substr = result.includes(person.function);
    //         let playerFunc = !!person.function;
    //         expect(substr).to.equal(playerFunc)
    //     })
    // });
    it('should return a correct count of commas', () => {
        let necessaryCommas = 0;
        let dataPerson = 0;
        for (let person in atlasShruggedCharacters) {
            if (atlasShruggedCharacters[person].length !== 0) {
                if (dataPerson !== 0) {
                    necessaryCommas += 1;
                    dataPerson += 1;
                } else dataPerson = 1
            }
        }
        let commas = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i] === ',') {
                commas++
            }
        }
        expect(necessaryCommas).to.equal(commas);
        expect(result[result.length - 1]).to.not.equal(',');
        expect(result[result.length - 2]).to.not.equal(',')
    })
});