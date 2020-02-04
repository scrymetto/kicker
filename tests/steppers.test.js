import React from "react";
import Steppers from "../src/components/steppers/steppers";
import {fireEvent, render, cleanup, waitForElement, act, prettyDOM} from "@testing-library/react";
import sinon from "sinon";
import {Form} from "../src/components/form/form";
import {form_validationSchema_newPlayer} from "../src/components/form/__validationSchema/form_validationSchema_newPlayer";

describe('<Steppers/> with non-form components', () => {

    afterEach(cleanup);
    const submit = sinon.spy();

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
        buttonNext = getByTestId('button_next');
        buttonPrev = getByTestId('button_back');
        expect(buttonNext).is.exist;
        expect(buttonPrev).is.exist;
    });
    test('\'button_back\' should close the <Steppers/>', () => {
        const {getByTestId, container} = render(<Steppers submit={submit}
                                                          numberOfCards={3}
                                                          components={[component1, component2, component3]}
        />);
        buttonPrev = getByTestId('button_back');
        fireEvent.click(buttonPrev);
        const paragraphs = container.getElementsByTagName('p');
        expect(paragraphs.length).to.equal(1); //because of <p/> in <Header/>
        buttonNext = container.getElementsByClassName('button_next');
        expect(buttonNext.length).to.equal(0);
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
        for (let i = 0; i < paragraphs.length; i++) {
            expect(paragraphs[i].textContent).to.not.equal(card2text)
        }
    });
    test('should call submit-function after the very last card', () => {
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
        act(() => jest.advanceTimersByTime(300)); // because of animation
        expect(submit.calledOnce).to.equal(true);
    });
});

const TestForm1 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm1'>
    <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
                 initial={initial}
                 inputs={[{text: 'name'}]}
          validationSchema={form_validationSchema_newPlayer}/>
    </div>
};

const TestForm2 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm2'>
    <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
                 initial={initial}
                 inputs={[{text: 'date of birth'}]}
                 validationSchema={form_validationSchema_newPlayer}/>
    </div>
};

const TestForm3 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm3'>
        <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
                 initial={initial}
                 inputs={[{text: 'date of death'}]}
                 validationSchema={form_validationSchema_newPlayer}
                 withRoundButton/>
    </div>
};

describe('<Steppers/> with form', () => {

    afterEach(cleanup);
    const submit = sinon.spy();

    let buttonNext;
    let buttonPrev;

    let option;

    const form1 = {
        component: TestForm1,
        form: true,
        initial: {name: ''}
    };

    const form2 = {
        component: TestForm2,
        form: true,
        initial: {dateOfBirth: ''}
    };

    const form3 = {
        component: TestForm3,
        form: true,
        initial: {dateOfDeath: ''}
    };

    test('should render first component', () => {
        const {getByTestId, container} = render(<Steppers numberOfCards={3}
                                                          components={[form1, form2, form3]}
                                                          submit={submit}/>);
        const testForm1 = getByTestId('testForm1');
        expect(testForm1).is.exist;
    });

    test('should have \'button_back\' and NOT have \'button_next\'', () => {
        const {getByTestId, container} = render(<Steppers numberOfCards={3}
                                                          components={[form1, form2, form3]}
                                                          submit={submit}/>);
        buttonNext = container.querySelector('.button_next');
        expect(buttonNext).is.not.exist;
        buttonPrev = getByTestId('button_back');
        console.log(prettyDOM(buttonPrev));
        expect(buttonPrev).is.exist;
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