import React from 'react';

import {Popup} from "../src/components/popup/popup";
import {Button} from "../src/components/button/button";
import {act, render, cleanup} from "@testing-library/react";


describe('Popup', () => {

    afterEach(cleanup);
    let wrapper;
    const text = 'You are awesome';
    let className = 'popup popup_error';
    it('should have text from props', () => {
        wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find('.text').text()).to.be.equal(text)
    });
    it('should have correct className', () => {
        wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find('div').hasClass(className)).to.be.equal(true)
    });
    it('should have button', () => {
        wrapper = shallow(<Popup text={text} className={className}/>);
        expect(wrapper.find(Button).length).to.be.equal(1)
    });
    it('should close Popup, if button clicked', () => {
        wrapper = shallow(<Popup text={text} className={className}/>);
        const button = wrapper.find(Button);
        button.simulate('click');
        expect(wrapper.props().in).to.equal(false)
    });
    it('should close popup after 5 seconds', ()=>{
        jest.useFakeTimers();
        className = 'popup popup_success';
        const {container} = render(<Popup text={text} className={className}/>);
        expect(container.childNodes.length).to.be.equal(1);
        act(()=>jest.advanceTimersByTime(5300)); //5000ms for setTimeout + 300ms for animation
        expect(container.childNodes.length).to.be.equal(0);
        });
});
