import React from 'react';

import {Context, EmptyContext} from "./config";
import Menu from "../src/components/menu/menu";

describe('Menu', () => {
    let wrapper = mount(<Context><Menu className='meh' /*logout={logout}*//></Context>);
    let wrapper2 = mount(<EmptyContext><Menu className='meh'/></EmptyContext>);
    it('should have class .meh', () => {
        expect(wrapper.getDOMNode().className).to.equal('menu meh');
        expect(wrapper2.getDOMNode().className).to.equal('menu meh')
    });
    it('should have \'log out\' button with context',  () => {
        expect(wrapper.find('.text_menu').last().text()).to.be.equal('Logout')
    });
    it('should NOT have \'log out\' button with empty context',  () => {
        expect(wrapper2.find('.text_menu').last().text()).to.not.be.equal('Logout')
    });
    // it('should call callback, if \'logout\' pressed', () => {
    //     wrapper.find('.text_menu').last().simulate('click');
    //     expect(logout.calledOnce).to.equal(true)
    // });
});