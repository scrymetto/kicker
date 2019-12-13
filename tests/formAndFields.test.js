import React from "react";
import * as Yup from 'yup';
import sinon from "sinon";
import {fireEvent, render, cleanup, prettyDOM, waitForElement} from "@testing-library/react";

import {Form} from "../src/components/form/form";
import {Button} from "../src/components/button/button";

describe('Form', () => {
    const validationSchema = Yup.object().shape({
        login: Yup.string(),
        password: Yup.string()
    });
    const onSubmit = sinon.spy();
    const inputs = [{text: 'login'}, {password: 'password'}];
    const initial = {login: 'login', password: 'password'};
    let wrapper = mount(<Form validationSchema={validationSchema}
                              initial={initial}
                              inputs={inputs}
                              onSubmit={onSubmit}
    />);
    test('should render inputs', () => {
        expect(wrapper.find('input').length).to.equal(inputs.length)
    });
    test('should render submit button', () => {
        expect(wrapper.find('button').length).to.equal(1)
    });
    wrapper.unmount();
    wrapper = mount(<Form validationSchema={validationSchema}
                          initial={initial}
                          inputs={inputs}
                          onSubmit={onSubmit}
                          withRoundButton
    />);
    test('should render a form with the round button, if it was in the props', () => {
        const button = wrapper.find(Button);
        expect(button.props().className).to.equal('button button_next')
    });
});

describe('Form fields ', () => {
    afterEach(cleanup);
    const onSubmit = sinon.spy();
    const validationSchema = Yup.object().shape({
        yourFavoriteEpisode: Yup.string(),
        yourFavoriteCharacter: Yup.array().of(Yup.string())
    });
    const initialEmptyMulti = {
        yourFavoriteEpisode: '',
        yourFavoriteCharacter: [],
    };
    const initialEmptySingle = {
        yourFavoriteEpisode: '',
        yourFavoriteCharacter: '',
    };
    const inputs = [{
        text: 'your favorite episode',
    }, {
        select: 'your favorite character',
        options: ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Beth Smith', 'Jerry Smith'],
        isSearchable: false
    }];
    const text = 'Actually, I don\'t like this sitcom';
    const initialMulti = {
        yourFavoriteEpisode: text,
        yourFavoriteCharacter: [inputs[1].options[2]],
    };

    const options = inputs[1].options;


    test('text value must be changeable', () => {
        const {getByTestId} = render(<Form validationSchema={validationSchema}
                                           inputs={inputs}
                                           initial={initialEmptyMulti}
                                           onSubmit={onSubmit}/>);

        const input = getByTestId('custom_input');
        expect(input.value).to.equal(initialEmptyMulti.yourFavoriteEpisode);
        fireEvent.change(input, {target: {value: text}});
        expect(input.value).to.equal(text);
    });

    test('select value with an empty initial value must have all options and be changeable', () => {
        const {getByText, container} = render(<Form validationSchema={validationSchema}
                                                    inputs={inputs}
                                                    initial={initialEmptyMulti}
                                                    onSubmit={onSubmit}/>);

        // because 'input'[0] is text input (inputs[0])
        let listOptions = container.querySelectorAll('input')[1];
        fireEvent.focus(listOptions);
        let listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        expect(container.querySelector('.form__field__menu-list')).is.exist;
        expect(container.querySelector('.form__field__menu-list').childNodes.length).to.equal(options.length);
        const option = getByText(options[2]);
        fireEvent.click(option);
        expect(container.querySelector('.form__field__menu-list')).is.not.exist;

        // value, which you can see in input
        // not 'input' because of react-select-library, which renders for 1 select:
        // 1 dummy-input and
        // 1 input with attribute 'name' for each value in multi-select 🤷
        let allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal(options[2]);
        const deleteButton = container.querySelector('.form__field__multi-value__remove');
        expect(deleteButton).is.exist;
        fireEvent.click(deleteButton);

        // because layout has been changed
        allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal('');
    });

    test('multi-value-select should work', () => {
        const {getByText, container} = render(<Form validationSchema={validationSchema}
                                                    inputs={inputs}
                                                    initial={initialEmptyMulti}
                                                    onSubmit={onSubmit}/>);
        let listOptions = container.querySelectorAll('input')[1];
        fireEvent.focus(listOptions);
        let listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        let option = getByText(options[2]);
        fireEvent.click(option);
        listOptions = container.querySelectorAll('input')[1];
        fireEvent.focus(listOptions);
        listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        option = getByText(options[3]);
        fireEvent.click(option);
        let allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(2);
        expect(allInputsWithValues[0].value).to.equal(options[2]);
        expect(allInputsWithValues[1].value).to.equal(options[3]);
        const deleteButton = container.querySelectorAll('.form__field__multi-value__remove');
        expect(deleteButton.length).to.equal(2);
        fireEvent.click(deleteButton[1]);
        allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal(options[2]);
    });
    test('single-value-select should work', () => {
        const {getByText, container} = render(<Form validationSchema={validationSchema}
                                                    inputs={inputs}
                                                    initial={initialEmptySingle}
                                                    onSubmit={onSubmit}/>);
        let listOptions = container.querySelectorAll('input')[1];
        fireEvent.focus(listOptions);
        let listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        let option = getByText(options[2]);
        fireEvent.click(option);
        let allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal(options[2]);
        listOptions = container.querySelectorAll('input')[1];
        fireEvent.focus(listOptions);
        listControl = container.querySelector('.form__field__control');
        fireEvent.mouseDown(listControl);
        option = getByText(options[3]);
        fireEvent.click(option);
        allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal(options[3]);
    });
    test('should have values, if initial is NOT empty, and be changeable', () => {
        const {getByTestId, container} = render(<Form validationSchema={validationSchema}
                                                    inputs={inputs}
                                                    initial={initialMulti}
                                                    onSubmit={onSubmit}/>);
        const input = getByTestId('custom_input');
        expect(input.value).to.equal(text);
        let allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal(options[2]);
        fireEvent.change(input, {target: {value: ''}});
        expect(input.value).to.equal('');
        const deleteButton = container.querySelector('.form__field__multi-value__remove');
        fireEvent.click(deleteButton);
        allInputsWithValues = container.querySelectorAll('input[name$="yourFavoriteCharacter"]');
        expect(allInputsWithValues.length).to.equal(1);
        expect(allInputsWithValues[0].value).to.equal('');
    })
});