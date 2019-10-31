import React from 'react';

import {Context} from "./config";
import Header from "../src/components/header/header";
import {Button} from "../src/components/button/button";
import Menu from "../src/components/menu/menu";

describe('Main header', () => {

    let wrapper = mount(<Context><Header className='header_main' text="test"/></Context>);

    it('should have class .header', () => {
        expect(wrapper.getDOMNode().className).to.equal('header header_main')
    });
    it('should contain correct paragraph', () => {
        let text = wrapper.findWhere(node => node.hasClass('text_header') && node.text() === 'test');
        expect(text.length).to.equal(1)
    });
    it('should contain button', () => {
        expect(wrapper.find(Button)).to.have.lengthOf(1)
    });
    it('button should have class .button_menu', () => {
        expect(wrapper.find(Button).hasClass('button_menu')).to.equal(true)
    });
    it('should contain menu', () => {
        expect(wrapper.find(Menu)).to.have.lengthOf(1)
    });
    it('menu should have class .menu_close', () => {
        expect(wrapper.find(Menu).hasClass('menu_close')).to.equal(true)
    });
    it('click on button_menu should set/unset class .menu_open for menu', () => {
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).hasClass('menu_open')).to.equal(true);
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).hasClass('menu_close')).to.equal(true)
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