import React from 'react';
import sinon from 'sinon';

import {Context, EmptyContext} from "./config";
import Menu from "../src/components/menu/menu";

const user = {username: 'Dumbledore', password: 'red_phoenix99'}

describe('Menu without user', () => {
    let wrapper;
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();

    it('should start animation, if status === \'true\'', () => {
        wrapper = mount(<Menu display={true} logout={logout}/>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(true);
    });
    it('should NOT render, if status === \'false\'', () => {
        wrapper = mount(<Menu display={false} logout={logout}/>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.length).to.equal(0);
    });
    it('should NOT have \'log out\' button with empty context', () => {
        wrapper = mount(<Menu display={true} logout={logout}/>);
        expect(wrapper.find('.text_menu').last().text()).to.not.be.equal('Logout')
    });
});

describe('Menu with user', () => {
    let wrapper;
    afterEach(()=>{
        wrapper.unmount();
    });
    let logout = sinon.spy();
    it('should start animation, if status === \'open\'', () => {
        wrapper = mount(<Menu display={true} logout={logout} user={user}/>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.props().in).to.equal(true);
    });
    it('should NOT render, if status === \'close\'', () => {
        wrapper = mount(<Menu display={false} logout={logout} user={user}/>);
        let menu = wrapper.find('[data-testid="menu"]').parent();
        expect(menu.length).to.equal(0);
    });
    it('should have \'log out\' button with context', () => {
        wrapper = mount(<Menu display={true} logout={logout} user={user}/>);
        expect(wrapper.find('.text_menu').last().text()).to.be.equal('Logout')
    });
    it('should call callback, if \'logout\' pressed', () => {
        wrapper = mount(<Menu display={true} logout={logout} user={user}/>);
        wrapper.find('.text_menu').last().simulate('click');
        expect(logout.calledOnce).to.equal(true);
    });
});