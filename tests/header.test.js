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
        let node = wrapper.findWhere(node => node.props().test === 'header');
        expect(wrapper.findWhere(node => node.props().test === 'header').hasClass('header header_main')).to.equal(true)
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
    it('menu should have status \'close\'', () => {
        expect(wrapper.find(Menu).props().status).to.equal('close')
    });
    it('click on button_menu should set/unset status \'open\' for menu', () => {
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).props().status).to.equal('open');
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(Menu).props().status).to.equal('close')
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