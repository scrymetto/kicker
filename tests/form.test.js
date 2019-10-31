import React from "react";
import * as Yup from 'yup';
import sinon from "sinon";

import {Form} from "../src/components/form/form";

describe('Form', () => {
    let validationSchema = Yup.object().shape({
        login: Yup.string(),
        password: Yup.string()
    });
    let onSubmit = sinon.spy();
    let input = [{text: 'login'}, {password: 'password'}];
    let initial = {login: 'login', password: 'password'};
    let wrapper = mount(<Form validationSchema={validationSchema}
                              initial={initial}
                              input={input}
                              onSubmit={onSubmit}
    />);
    it('should render inputs', () => {
        expect(wrapper.find('input').length).to.equal(input.length)
    });
    it('should render submit button', () => {
        expect(wrapper.find('button').length).to.equal(1)
    });
});
