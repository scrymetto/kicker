import React from "react";
import Steppers from "../src/components/steppers/steppers";
import {fireEvent, render, cleanup, waitForElement, act, prettyDOM} from "@testing-library/react";
import sinon from "sinon";
import {element} from "prop-types";

describe('<Steppers/> with non-form components', () => {

    afterEach(cleanup);
    const submit = sinon.spy();

    let option;
    let buttonNext;
    let buttonPrev;

    const component1 = {
        component: () => <p data-testid='steppersComponent1'>Be born</p>,
        form: false
    };
    const component2 = {
        component: () => <p data-testid='steppersComponent2'>Make mistakes</p>,
        form: false
    };
    const component3 = {
        component: () => <p data-testid='steppersComponent3'>Die</p>,
        form: false
    };

    test('should render first non-form component', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        const card1 = getByTestId('steppersComponent1');
        expect(card1).is.exist;
    });
    test('non-form component should have \'button_next\' and \'button_back\'', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        const button_next = getByTestId('button_next');
        const button_back = getByTestId('button_back');
        expect(button_next).is.exist;
        expect(button_back).is.exist;
    });
    test('\'button_back\' should close the <Steppers/>', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        const button_back = getByTestId('button_back');
        fireEvent.click(button_back);
        const paragraphs = container.getElementsByTagName('p');
        expect(paragraphs.length).to.equal(1); //because of <p/> in <Header/>
        const button_next = container.getElementsByClassName('button_next');
        expect(button_next.length).to.equal(0);
    });
    test('should toggle between non-form components', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        buttonNext = container.querySelector('.button_next');
        fireEvent.click(buttonNext);
        const card2 = getByTestId('steppersComponent2');
        const card2text = card2.textContent;
        expect(card2).is.exist;
        buttonPrev = container.querySelector('.button_back');
        fireEvent.click(buttonPrev);
        const card1 = getByTestId('steppersComponent1');
        expect(card1).is.exist;
        const paragraphs = container.getElementsByTagName('p');
        for (let i=0; i<paragraphs.length; i++){
            expect(paragraphs[i].textContent).to.not.equal(card2text)
        }
    });
    test('should call submit-function after the very last card', ()=> {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        buttonNext = container.querySelector('.button_next');
        fireEvent.click(buttonNext);
        buttonNext = container.querySelector('.button_next');
        fireEvent.click(buttonNext);
        const card3 = getByTestId('steppersComponent3');
        expect(card3).is.exist;
        buttonNext = container.querySelector('.button_next');
        fireEvent.click(buttonNext);
        console.log(prettyDOM(container))
    });

    test('should toggle between non-form components!!', async () => {
        const {getByTestId, container} = render(<Steppers submit={submit}/>);
        // const cardWithNames = getByTestId('names');
        // expect(cardWithNames).is.exist;
        // buttonNext = container.querySelector('.button_next');
        // await waitForElement(() => fireEvent.click(buttonNext));
        const cardWithPlayers = getByTestId('players');
        expect(cardWithPlayers).is.exist;
    });

    test('should return errors, if there is validation problem in \'Players\'-form', async () => {
        const {getByText, getByTestId, container} = render(<Steppers submit={submit}/>);
        // buttonNext = container.querySelector('.button_next');
        // await waitForElement(() => fireEvent.click(buttonNext));
        buttonNext = container.querySelector('.button_next');
        await waitForElement(() => fireEvent.click(buttonNext));

        let error = container.getElementsByClassName('text_error');
        expect(error.length).to.equal(2);

        let listOptions = container.querySelectorAll('input')[0];
        fireEvent.focus(listOptions);
        let listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        option = getByText('blue');
        fireEvent.click(option);

        listOptions = container.querySelectorAll('input')[2];
        fireEvent.focus(listOptions);
        listControl = container.querySelectorAll('.form__field__control')[1];
        fireEvent.mouseDown(listControl);
        option = getByText('red');
        fireEvent.click(option);

        buttonNext = container.querySelector('.button_next');
        await waitForElement(() => fireEvent.click(buttonNext));
        error = container.getElementsByClassName('text_error');
        expect(error.length).to.equal(0);

        const cardWithScores = getByTestId('scores');
        expect(cardWithScores).is.exist;
    });

    test('should call cancel-function', () => {
        jest.useFakeTimers();
        const {container, debug} = render(<Steppers submit={submit}/>);
        buttonPrev = container.querySelector('.button_back');
        fireEvent.click(buttonPrev);
        act(() => jest.advanceTimersByTime(300)); // because of animation
        expect(submit.calledOnce).to.equal(true);
        expect(submit.calledWith(initialState)).to.equal(true);
    });

    test('should call submit-function', async () => {
        jest.useFakeTimers();
        const {getByText, container, debug} = render(<Steppers cancel={cancel} submit={submit}/>);
        // buttonNext = container.querySelector('.button_next');
        // await waitForElement(() => fireEvent.click(buttonNext));

        let listOptions = container.querySelectorAll('input')[0];
        fireEvent.focus(listOptions);
        let listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        option = getByText('blue');
        fireEvent.click(option);

        listOptions = container.querySelectorAll('input')[2];
        fireEvent.focus(listOptions);
        listControl = container.querySelectorAll('.form__field__control')[1];
        fireEvent.mouseDown(listControl);
        option = getByText('red');
        fireEvent.click(option);

        buttonNext = container.querySelector('.button_next');
        await waitForElement(() => fireEvent.click(buttonNext));

        buttonNext = container.querySelector('.button_next');
        await waitForElement(() => fireEvent.click(buttonNext));

        act(() => jest.advanceTimersByTime(300)); // because of animation
        expect(submit.calledOnce).to.equal(true);
    });
});