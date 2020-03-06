import React from 'react';

import {Context} from "./config";
import Header from "../src/components/header/header";
import {Button} from "../src/components/button/button";
import Menu from "../src/components/menu/menu";


describe('Main header', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Context><Header className='header_main' text="test"/></Context>);
    });
    afterEach(() => {
        wrapper.unmount()
    });

    it('should have class .header', () => {
        let node = wrapper.find('[data-testid="header"]');
        expect(node.hasClass('header header_main')).to.equal(true)
    });
    it('should contain correct paragraph', () => {
        let text = wrapper.findWhere(node => node.hasClass('text_header_main') && node.text() === 'test');
        expect(text.length).to.equal(1)
    });
    it('should contain button', () => {
        expect(wrapper.find(Button)).to.have.lengthOf(1)
    });
    it('button should have class .button_menu', () => {
        expect(wrapper.find(Button).hasClass('button_menu')).to.equal(true)
    });
    it('should NOT contain menu', () => {
        expect(wrapper.find(Menu)).to.have.lengthOf(0)
    });
    it('click on button_menu should open/close menu', () => {
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).props().display).to.equal(true);
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).props().display).to.equal(false);
    });
});
describe('Card header', () => {
    let wrapper = mount(<Context><Header text="test"/></Context>);
    it('should have class .header', () => {
        expect(wrapper.hasClass('header'))
    });
    it('should contain correct paragraph', () => {
        let text = wrapper.findWhere(node => node.hasClass('text_header') && node.text() === 'test');
        expect(text.length).to.equal(1)
    });
    it('should not contain menu button', () => {
        expect(wrapper.find(Button)).to.have.lengthOf(0)
    });
    it('should not contain menu', () => {
        expect(wrapper.find(Menu)).to.have.lengthOf(0)
    });
});