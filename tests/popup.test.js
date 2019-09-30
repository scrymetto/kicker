import React from 'react';
import sinon from "sinon";

import {Popup} from "../src/components/popup/popup";
import {Button} from "../src/components/button/button";

describe('Popup', () => {
    let text = 'You are awesome';
    let className = 'popup_error';
    let wrapper = mount(<Popup text={text} className={className}/>);
    it('should have text from props', () => {
        expect(wrapper.find('.text').text()).to.be.equal(text)
    });
    it('should have correct className', () => {
        expect(wrapper.find('div').hasClass(className)).to.be.equal(true)
    });
    it('should have button', () => {
        expect(wrapper.find(Button).length).to.be.equal(1)
    });
    it('should close Popup, if button clicked', () => {
        let button = wrapper.find(Button);
        const spy = sinon.spy(button.props().onClick);
        button.simulate('click');
        expect(spy.calledOnce).to.equal(true)
    });

});
