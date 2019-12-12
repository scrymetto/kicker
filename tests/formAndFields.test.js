import React from "react";
import * as Yup from 'yup';
import sinon from "sinon";
import {fireEvent, render, cleanup, prettyDOM, waitForElement} from "@testing-library/react";

import {Form} from "../src/components/form/form";
import {Button} from "../src/components/button/button";

// describe('Form', () => {
//     const validationSchema = Yup.object().shape({
//         login: Yup.string(),
//         password: Yup.string()
//     });
//     const onSubmit = sinon.spy();
//     const inputs = [{text: 'login'}, {password: 'password'}];
//     const initial = {login: 'login', password: 'password'};
//     let wrapper = mount(<Form validationSchema={validationSchema}
//                               initial={initial}
//                               inputs={inputs}
//                               onSubmit={onSubmit}
//     />);
//     test('should render inputs', () => {
//         expect(wrapper.find('input').length).to.equal(inputs.length)
//     });
//     test('should render submit button', () => {
//         expect(wrapper.find('button').length).to.equal(1)
//     });
//     wrapper.unmount();
//     wrapper = mount(<Form validationSchema={validationSchema}
//                           initial={initial}
//                           inputs={inputs}
//                           onSubmit={onSubmit}
//                           withRoundButton
//     />);
//     test('should render a form with the round button, if it was in the props', () => {
//         const button = wrapper.find(Button);
//         expect(button.props().className).to.equal('button button_next')
//     });
// });

describe('Form fields ', () => {
    afterEach(cleanup);
    const onSubmit = sinon.spy();
    const validationSchema = Yup.object().shape({
        yourFavoriteEpisode: Yup.string(),
        yourFavoriteCharacter: Yup.array().of(Yup.string())
    });
    const initial = {
        yourFavoriteEpisode: '',
        yourFavoriteCharacter: [],
    };
    const inputs = [{
        text: 'your favorite episode',
    }, {
        select: 'your favorite character',
        options: ['Rick Sanchez', 'Morty Smith', 'Summer Smith'],
        isSearchable: false
    }];
    const text = 'I don\'t like this sitcom';

    test('text value must be changeable', () => {
        const {getByTestId} = render(<Form validationSchema={validationSchema}
                                           inputs={inputs}
                                           initial={initial}
                                           onSubmit={onSubmit}/>);

        const input = getByTestId('custom_input');
        expect(input.value).to.equal(initial.yourFavoriteEpisode);
        fireEvent.change(input, {target: {value: text}});
        expect(input.value).to.equal(text);
    });

    test('select value must be changeable', async () => {
        const {getByTestId, getByText, container, debug} = render(<Form validationSchema={validationSchema}
                                                                        inputs={inputs}
                                                                        initial={initial}
                                                                        onSubmit={onSubmit}/>);
        console.log(prettyDOM(getByTestId('custom_select')))
        // fireEvent.focus;
        const option = await waitForElement(() => getByText(inputs[1].options[1]), {container});
        console.log(prettyDOM(option))
        debug()
    })
});