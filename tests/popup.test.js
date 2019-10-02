import React from 'react';

import {Popup} from "../src/components/popup/popup";
import {Button} from "../src/components/button/button";

describe('Popup', () => {
    let text = 'You are awesome';
    let className = 'popup_error';
    let wrapper = shallow(<Popup text={text} className={className}/>);
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
        // console.log(wrapper.debug())
        let button = wrapper.find(Button);
        button.simulate('click');
        expect(wrapper.props().in).to.equal(false)
    });

});
