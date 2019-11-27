import React from 'react';
import sinon from 'sinon';

import {Context, EmptyContext} from "./config";
import Menu from "../src/components/menu/menu";

describe('Menu with empty context', () => {
    let wrapper;
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();

    it('should start animation, if status === \'true\'', () => {
        wrapper = mount(<EmptyContext><Menu status={true} logout={logout}/></EmptyContext>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(true);
    });
    it('should NOT start animation, if status === \'false\'', () => {
        wrapper = mount(<EmptyContext><Menu status={false} logout={logout}/></EmptyContext>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should NOT have \'log out\' button with empty context', () => {
        wrapper = mount(<EmptyContext><Menu status={false} logout={logout}/></EmptyContext>);
        expect(wrapper.find('.text_menu').last().text()).to.not.be.equal('Logout')
    });
});

describe('Menu with context', () => {
    let wrapper;
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();
    it('should start animation, if status === \'open\'', () => {
        wrapper = mount(<Context><Menu status={true} logout={logout}/></Context>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(true);
    });
    it('should NOT start animation, if status === \'close\'', () => {
        wrapper = mount(<Context><Menu status={false} logout={logout}/></Context>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(false);
    });
    it('should have \'log out\' button with context', () => {
        wrapper = mount(<Context><Menu status={false} logout={logout}/></Context>);
        expect(wrapper.find('.text_menu').last().text()).to.be.equal('Logout')
    });
    it('should call callback, if \'logout\' pressed', () => {
        wrapper = mount(<Context><Menu status={false} logout={logout}/></Context>);
        wrapper.find('.text_menu').last().simulate('click');
        expect(logout.calledOnce).to.equal(true);
    });
});