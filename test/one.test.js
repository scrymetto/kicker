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
        expect(wrapper.find('.button_back')).has.lengthOf(1)
    });
});