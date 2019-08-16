import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';

import App from "../src/App";
import Card from "../src/components/card/card"
import Header from "../src/components/header/header";
import Button from "../src/components/button/button";

global.shallow = shallow;
configure({adapter: new Adapter()});
global.expect = expect;

describe('App', () => {
    let wrapper = shallow(<App/>);
    it('should render one component', () => {
        expect(wrapper.contains(<Card/>)).to.equal(true)
    });
    it('should have class .App', () => {
        expect(wrapper.hasClass('App')).to.equal(true)
    })
});

describe('Card', () => {
    let wrapper = shallow(<Card/>);
    it('should have class .Card', () => {
        expect(wrapper.hasClass('Card')).to.equal(true)
    });
    it('should contain header', () => {
        expect(wrapper.containsAnyMatchingElements([<Header/>])).to.equal(true)
    });
    it('should contain button', () => {
        expect(wrapper.containsAnyMatchingElements([<Button/>])).to.equal(true)
    });
    it('button should have class\'back\'', () => {
        expect(wrapper.find('.button_back')).has.lengthOf(1)
    });
});