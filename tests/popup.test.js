import React from 'react';

import {Popup} from "../src/components/popup/popup";
import {Button} from "../src/components/button/button";

describe('Popup', () => {
    let text = 'You are awesome';
    let className = 'popup_error';
    it('should have text from props', () => {
        let wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find('.text').text()).to.be.equal(text)
    });
    it('should have correct className', () => {
        let wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find('div').hasClass(className)).to.be.equal(true)
    });
    it('should have button', () => {
        let wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find(Button).length).to.be.equal(1)
    });
    it('should close Popup, if button clicked', () => {
        let wrapper = shallow(<Popup text={text} className={className}/>);
        let button = wrapper.find(Button);
        button.simulate('click');
        expect(wrapper.props().in).to.equal(false)
    });
    it('should close popup after 5 seconds', ()=>{
        className = 'popup_success';
        let wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.props().in).to.equal(true);
        jest.runOnlyPendingTimers();
        expect(wrapper.props().in).to.equal(false)
        });
});
