import React from 'react';
import {Button} from "../src/components/button/button";
import sinon from 'sinon'

describe ('Button ', () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });

    let text = 'click me';
    let wrapper = shallow(<Button className='button' text={text}/>);
    it('should render simple button, if has prop classname = \'button\'', ()=> {
        expect(wrapper.find('.button').length).to.be.equal(1)
    });
    let wrapper2 = shallow(<Button className='button button_menu' text={text}/>);
    it('should render button_menu, if has prop classname = \'button button_menu\'', ()=> {
        expect(wrapper2.find('.button_menu').length).to.be.equal(1)
    });
    let wrapper3 = shallow(<Button className='button button_back' text={text}/>);
    it('should render button_back, if has prop classname = \'button button_back\'', ()=> {
        expect(wrapper3.find('.button_back').length).to.be.equal(1)
    });
    let wrapper4 = shallow(<Button className='button button_close' text={text}/>);
    it('should render button_close, if has prop classname = \'button button_close\'', ()=> {
        expect(wrapper4.find('.button_close').length).to.be.equal(1)
    });
    it('onClick should be called at once', ()=> {
        let onClick = sinon.spy();
        let wrapper5 = shallow(<Button className='button' text={text} onClick={onClick}/>);
        wrapper5.simulate('click');
        expect(onClick.calledOnce).to.be.equal(true);
    });
    it('should have text from prop', () => {
        expect(wrapper.find('.button').text()).to.be.equal(text)
    })
});