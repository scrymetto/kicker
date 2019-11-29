import {prepareHooksForSteppers} from "../src/helpers/prepareHooksForSteppers";
import {DoublyLinkedList} from "../src/helpers/prepareHooksForSteppers";
import {Hook} from "../src/helpers/prepareHooksForSteppers";

describe('prepareHooksForSteppers() ', () => {
    let summer = false;
    let autumn = false;
    let winter = false;
    let spring = false;

    const setSummer = () => {
        array[0][0] = !array[0][0]
    };
    const setAutumn = () => {
        array[1][0] = !array[1][0]
    };
    const setWinter = () => {
        array[2][0] = !array[2][0]
    };
    const setSpring = () => {
        array[3][0] = !array[3][0]
    };

    const array = [[summer, setSummer], [autumn, setAutumn], [winter, setWinter], [spring, setSpring]];

    const list = prepareHooksForSteppers(array);

    it('should return DoublyLinkedList', () => {
        expect(list).to.be.an.instanceof(DoublyLinkedList)
    });
    it('this.getCurrent() should work', () => {
        setWinter();
        expect(list.getCurrent().data).to.be.equal(array[2]);
        setWinter();
        setSummer();
        expect(list.getCurrent().data).to.be.equal(array[0]);
    });
    it('should return DoublyLinkedList with Hooks', () => {
        expect(list.getCurrent()).to.be.an.instanceof(Hook)
    });
});


