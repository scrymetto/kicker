import {prepareStylesForTable} from "../src/helpers/prepareStylesForTable";

const symphonyByShostakovitch = new Map([
    [[1], {key: 'f-moll'}],
    [[2], {key: 'H-dur'}],
    [[3, 9], {key: 'Es-dur'}],
    [[4, 8], {key: 'c-moll'}],
    [[5, 12], {key: 'd-moll'}],
    [[6], {key: 'h-moll'}],
    [[7], {key: 'C-dur'}],
    [[10], {key: 'e-moll'}],
    [[11, 14], {key: 'g-moll'}],
    [[13], {key: 'b-moll'}],
    [[15], {key: 'A-dur'}],
    [[4, 8, 11, 13, 15], {premiere: 'Moscow'}],
    [[1, 2, 3, 5, 6, 9, 10, 12, 14], {premiere: 'Leningrad'}],
    [[7], {premiere: 'Kuybyshev'}],
    [[7, 5, 8], {popular: true}]
]);

describe('prepareStylesForTable() ', () => {
    let result = prepareStylesForTable(symphonyByShostakovitch);

    it('should return an array', () => {
        expect(Array.isArray(result)).to.equal(true)
    });

    it('should return correct count of uniq cells', () => {
        let countOfUniqCells = 0;
        let helperArray = [];
        symphonyByShostakovitch.forEach((value, key) => {
            key.forEach(count => {
                if (!helperArray[count]) {
                    helperArray[count] = true;
                    countOfUniqCells += 1;
                }
            })
        });
        let resultUniqCells = 0;
        result.forEach((cell) => {
            if (cell) {
                resultUniqCells += 1
            }
        });
        expect(countOfUniqCells).to.equal(resultUniqCells)
    });
    it('should return obj with all properties for each cell', ()=>{
        let random = 7;
        let randomObject = {};
        symphonyByShostakovitch.forEach((value, key) => {
            if (key.includes(random)) Object.assign(randomObject, value)
        });
        Object.keys(randomObject).forEach((property) => {
            expect(randomObject[property]).to.equal(result[random][property])
        })
    });
});

