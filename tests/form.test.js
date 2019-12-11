import React from "react";
import * as Yup from 'yup';
import sinon from "sinon";

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
    test('should render a form with the round button, if it was in the props', ()=>{
        const button = wrapper.find(Button);
        expect(button.props().className).to.equal('button button_next')
    });
});