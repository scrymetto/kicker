import React from 'react';
import sinon from "sinon";
import {Button} from "../src/components/button/button";

describe ('Button ', () => {
    let wrapper = shallow(<Button className='button' text='click me'/>);
    it('Should render simple button, if has prop classname = \'button\'', ()=> {
        expect(wrapper.find('.button').length).to.be.equal(1)
    });
    let wrapper2 = shallow(<Button className='button button_menu' text='click me'/>);
    it('Should render button_menu, if has prop classname = \'button button_menu\'', ()=> {
        expect(wrapper2.find('.button_menu').length).to.be.equal(1)
    });
    let wrapper3 = shallow(<Button className='button button_back' text='click me'/>);
    it('Should render button_back, if has prop classname = \'button button_back\'', ()=> {
        expect(wrapper3.find('.button_back').length).to.be.equal(1)
    });
    let wrapper4 = shallow(<Button className='button button_close' text='click me'/>);
    it('Should render button_close, if has prop classname = \'button button_close\'', ()=> {
        expect(wrapper4.find('.button_close').length).to.be.equal(1)
    });
    it('onClick should be called at once', ()=> {
        let onClick = sinon.spy();
        let wrapper5 = shallow(<Button className='button' text='click me' onClick={onClick}/>);
        wrapper5.simulate('click');
        expect(onClick.calledOnce);
    });
});