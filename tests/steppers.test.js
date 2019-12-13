import React from "react";
import {Steppers} from "../src/helpers/components/steppers/steppers";
import {fireEvent, render, cleanup, waitForElement, prettyDOM} from "@testing-library/react";
import sinon from "sinon";

describe ('<Steppers/> ', () =>{
    afterEach(cleanup);
    const cancel = sinon.spy();
    const submit = sinon.spy();
    test('should toggle between forms', async () => {
        const {getByText, getByTestId, container, debug} = render(<Steppers cancel={cancel} submit={submit}/>)
        const cardWithNames = getByTestId('names');
        expect(cardWithNames).is.exist;
        let buttonNext = container.querySelector('.button');
        await waitForElement(()=>fireEvent.click(buttonNext));
        const cardWithPlayers = getByTestId('players');
        expect(cardWithPlayers).is.exist;

        buttonNext = container.querySelector('.button');
        await waitForElement(()=>fireEvent.click(buttonNext));

        const error = container.getElementsByClassName('text_error');
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
        let option = getByText('red');
        fireEvent.click(option);

        buttonNext = container.querySelector('.button');
        await waitForElement(()=>fireEvent.click(buttonNext));

        buttonNext = container.querySelector('.button');
        await waitForElement(()=>fireEvent.click(buttonNext));

        expect(submit.calledOnce).to.equal(true)

        debug()
    })
});