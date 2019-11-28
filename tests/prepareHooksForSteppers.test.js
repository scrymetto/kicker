import {prepareHooksForSteppers} from "../src/helpers/prepareHooksForSteppers";
import {DoublyLinkedList} from "../src/helpers/prepareHooksForSteppers";

describe('prepareHooksForSteppers() ', () => {
    let summer = false;
    let autumn = false;
    let winter = true;
    let spring = false;

    const setSummer = () => {
        summer = !summer
    };
    const setAutumn = () => {
        autumn = !autumn
    };
    const setWinter = () => {
        winter = !winter
    };
    const setSpring = () => {
        spring = !spring
    };

    const array = [[summer, setSummer], [autumn, setAutumn], [winter, setWinter], [spring, setSpring]];

    const list = prepareHooksForSteppers(array);

    it('should return DoublyLinkedList', () => {
        expect(list).to.be.an.instanceof(DoublyLinkedList)
    });
    it('this.getCurrent() should work', () => {
        expect(list.getCurrent().data).to.be.equal(array[2]);
        list.getCurrent().next.data[1]();
        console.log(autumn)
        console.log(winter)
        expect(list.getCurrent().data).to.be.equal(array[3]);
    })
});


