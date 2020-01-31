import React from "react";
import Steppers from "../src/components/steppers/steppers";
import {fireEvent, render, cleanup, waitForElement, act, prettyDOM} from "@testing-library/react";
import sinon from "sinon";

describe('<Steppers/> ', () => {
    afterEach(cleanup);
    const submit = sinon.spy();

    let option;
    let buttonNext;
    let buttonPrev;

    const component1 = () => <p>component1</p>;
    const component2 = () => <p>component2</p>;
    const component3 = () => <p>component3</p>;

    test('should render without problem', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        const card1 = getByTestId('component1');
        console.log(prettyDOM(container))

    });
    test('should toggle between forms', async () => {
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