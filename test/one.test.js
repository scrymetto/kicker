import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount} from 'enzyme';
import { JSDOM } from 'jsdom';
import {expect} from 'chai';
import React from 'react';

import App from "../src/App";
import Card from "../src/components/card/card"
import Header from "../src/components/header/header";
import Button from "../src/components/button/button";
import Menu from "../src/components/menu/menu";

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.shallow = shallow;
global.mount = mount;
configure({adapter: new Adapter()});
global.expect = expect;

describe('App', () => {
    let wrapper = shallow(<App/>);
    it('should render Card', () => {
        expect(wrapper.contains(<Card/>)).to.equal(true)
    });
    it('should have class .App', () => {
        expect(wrapper.hasClass('App')).to.equal(true)
    })
});

describe('Card', () => {
    let wrapper = shallow(<Card/>);
    it('should have class .card', () => {
        expect(wrapper.hasClass('card')).to.equal(true)
    });
    it('should contain header', () => {
        expect(wrapper.containsAnyMatchingElements([<Header/>])).to.equal(true)
    });
    it('should contain button', () => {
        expect(wrapper.containsAnyMatchingElements([<Button/>])).to.equal(true)
    });
    it('should be one button with class\'back\'', () => {
        expect(wrapper.hasClass('button_back'));
    });
});

describe ('Main header', () => {
    let wrapper = mount(<Header className='header_main' text="test"/>);
    it('should have class .header', () => {
        expect(wrapper.hasClass('header'))
    });
    it('should contain correct paragraph', () => {
        expect(wrapper.contains(<p>test</p>)).to.equal(true)
    });
    it('should contain menu button', () => {
        expect(wrapper.find(Button)).to.have.lengthOf(1)
    });
    it('should contain menu', () => {
        expect(wrapper.find(Menu)).to.have.lengthOf(1)
    });
});

describe ('Card header', () => {
    let wrapper = mount(<Header text="test"/>);
    it('should have class .header', () => {
        expect(wrapper.hasClass('header'))
    });
    it('should contain correct paragraph', () => {
        expect(wrapper.contains(<p>test</p>)).to.equal(true)
    });
    it('should not contain menu button', () => {
        expect(wrapper.find(Button)).to.have.lengthOf(0)
    });
    it('should not contain menu', () => {
        expect(wrapper.find(Menu)).to.have.lengthOf(0)
    });
});