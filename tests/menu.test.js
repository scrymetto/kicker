import React from 'react';
import sinon from 'sinon';

import {Context, EmptyContext} from "./config";
import Menu from "../src/components/menu/menu";

describe('Menu with empty context', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<EmptyContext><Menu status='close'/></EmptyContext>);
    });
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();

    it('should start animation, if status === \'open\'', () => {
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should NOT start animation, if status === \'close\'', () => {
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should NOT have \'log out\' button with empty context', () => {
        expect(wrapper.find('.text_menu').last().text()).to.not.be.equal('Logout')
    });
});

describe('Menu with context', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<Context><Menu status='close' logout={logout}/></Context>);
    });
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();
    it('should start animation, if status === \'open\'', () => {
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should NOT start animation, if status === \'close\'', () => {
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should have \'log out\' button with context', () => {
        expect(wrapper.find('.text_menu').last().text()).to.be.equal('Logout')
    });
    it('should call callback, if \'logout\' pressed', () => {
        wrapper.find('.text_menu').last().simulate('click');
        expect(logout.calledOnce).to.equal(true);
    });
});