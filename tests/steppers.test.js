import React from "react";
import {fireEvent, render, cleanup, waitForElement, act, prettyDOM, wait} from "@testing-library/react";
import sinon from "sinon";
import * as Yup from "yup";

import Steppers from "../src/components/steppers/steppers";
import {Form} from "../src/components/form/form";

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
        buttonNext = container.querySelector('.button_next');
        buttonPrev = container.querySelector('.button_back');
        fireEvent.click(buttonPrev);
        // fireEvent.click(buttonNext);
        // const card3 = getByTestId('steppersComponent3');
        // expect(card3).is.exist;
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


const form_validationSchema_steppersTest1 = Yup.object().shape({
    name: Yup.string()
        .required('Name is required.'),
});
const form_validationSchema_steppersTest2 = Yup.object().shape({
    dateOfBirth:Yup.string()
        .required('Date of birth is required.'),
});
const form_validationSchema_steppersTest3 = Yup.object().shape({
    dateOfDeath:Yup.string()
        .required('Date of death is required.'),
});
const TestForm1 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm1'>
        <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
              initial={initial}
              inputs={[{text: 'name'}]}
              validationSchema={form_validationSchema_steppersTest1}/>
    </div>
};

const TestForm2 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm2'>
        <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
              initial={initial}
              inputs={[{text: 'date of birth'}]}
              validationSchema={form_validationSchema_steppersTest2}
              withRoundButton/>
    </div>
};

const TestForm3 = ({initial, setNewStatus, nameInState}) => {
    return <div data-testid='testForm3'>
        <Form onSubmit={(values) => setNewStatus('next', values, nameInState)}
              initial={initial}
              inputs={[{text: 'date of death'}]}
              validationSchema={form_validationSchema_steppersTest3}
              withRoundButton/>
    </div>
};



describe('<Steppers/> with form', () => {

    afterEach(cleanup);

    let buttonNext;
    let buttonPrev;

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
        const submit = sinon.spy();
        const {getByTestId, container} = render(<Steppers numberOfCards={3}
                                                          components={[form1, form2, form3]}
                                                          submit={submit}/>);
        const testForm1 = getByTestId('testForm1');
        expect(testForm1).is.exist;
    });

    test('should have \'button_back\' and NOT have \'button_next\'', () => {
        const submit = sinon.spy();
        const {getByTestId, container} = render(<Steppers numberOfCards={3}
                                                          components={[form1, form2, form3]}
                                                          submit={submit}/>);
        buttonNext = container.querySelector('.button_next');
        expect(buttonNext).is.not.exist;
        buttonPrev = getByTestId('button_back');
        expect(buttonPrev).is.exist;
    });

    test('should return errors, if there is validation problem', async () => {
        const submit = sinon.spy();
        const {getByText, getByTestId, container} = render(<Steppers numberOfCards={3}
                                                                     components={[form1, form2, form3]}
                                                                     submit={submit}/>);
        buttonNext = getByText('Submit');
        await wait(() => fireEvent.click(buttonNext));
        let error = container.getElementsByClassName('text_error');
        expect(error.length).to.equal(1);
        const input = getByTestId('custom_input');
        fireEvent.change(input, {target: {value: 'Dostoevsky'}});
        await wait(() => fireEvent.click(buttonNext));
        error = container.getElementsByClassName('text_error');
        expect(error.length).to.equal(0);
        const testForm2 = getByTestId('testForm2');
        expect(testForm2).is.exist;
    });

    test('should call cancel-function', () => {
        const submit = sinon.spy();
        jest.useFakeTimers();
        const {container, debug} = render(<Steppers numberOfCards={3}
                                                    components={[form1, form2, form3]}
                                                    submit={submit}/>);
        buttonPrev = container.querySelector('.button_back');
        fireEvent.click(buttonPrev);
        act(() => jest.advanceTimersByTime(300)); // because of animation
        expect(submit.calledOnce).to.equal(true);
    });

    test('should call submit-function', async () => {
        const submit = sinon.spy();
        jest.useFakeTimers();
        const {getByText, container, debug, getByTestId, getByRole} = render(<Steppers numberOfCards={3}
                                                                     components={[form1, form2, form3]}
                                                                     submit={submit}/>);
        const testForm1 = getByTestId('testForm1');
        expect(testForm1).is.exist;

        const input = getByTestId('custom_input');
        fireEvent.change(input, {target: {value: 'Dostoevsky'}});
        fireEvent.click(getByTestId('submit'));
        const testForm2 = await waitForElement(()=>getByTestId('testForm2'));
        expect(testForm2).is.exist;

        const input2 = getByTestId('custom_input');
        fireEvent.change(input2, {target: {value: '11.11.1821'}});
        fireEvent.click(getByTestId('submit'));
        const testForm3 = await waitForElement(()=>getByTestId('testForm3'));
        expect(testForm3).is.exist;

        const input3 = getByTestId('custom_input');
        fireEvent.change(input3, {target: {value: '9.12.1881'}});
        buttonNext = getByRole('form');
        await waitForElement(() => fireEvent.submit(buttonNext));

        act(() => jest.advanceTimersByTime(300)); // because of animation
        expect(submit.calledOnce).to.equal(true);
    });
});