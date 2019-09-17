import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount} from 'enzyme';
import { JSDOM } from 'jsdom';
import {expect} from 'chai';
import React from 'react';

import App from "../src/App";
import Card from "../src/components/card/card"
import Header from "../src/components/header/header";
import {Button} from "../src/components/button/button";
import Menu from "../src/components/menu/menu";
import {makeCamelCaseFromString} from "../src/helpers/makeCamelCaseFromString"

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.shallow = shallow;
global.mount = mount;
configure({adapter: new Adapter()});
global.expect = expect;

describe('App', () => {
    let wrapper = shallow(<App/>);
    it('should have class .App', () => {
        expect(wrapper.find('div').hasClass('App')).to.equal(true)
    })
});

describe('Card', () => {
    let wrapper = mount(<Card render={()=>(<button/>)}/>);
    it('should have class .card', () => {
        expect(wrapper.getDOMNode().className).to.equal('card')
    });
    it('should contain header', () => {
        expect(wrapper.contains(<Header text='header'/>)).to.equal(true)
    });
    it('should contain buttons', () => {
        expect(wrapper.find('button')).to.have.lengthOf(2)
    });
    it('should be one button with class\'back\'', () => {
        expect(wrapper.contains(<Button className='button button_back'/>)).to.equal(true);
    });
});

describe ('Main header', () => {
    let wrapper = mount(<Header className='header_main' text="test"/>);
    it('should have class .header', () => {
        expect(wrapper.getDOMNode().className).to.equal('header header_main')
    });
    it('should contain correct paragraph', () => {
        expect(wrapper.contains(<p>test</p>)).to.equal(true)
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

describe ('Menu', ()=> {
    let wrapper = mount(<Menu className='meh' />);
    it ('should have class .meh', () => {
        expect(wrapper.getDOMNode().className).to.equal('menu meh')
    })
});

describe ('makeCamelCaseFromString', ()=> {
    it('should return correctly sentence with all letters', () => {
        let camelCase = makeCamelCaseFromString('do you have some tee');
        expect(camelCase).to.equal('doYouHaveSomeTee')
    });
    it('should return correctly sentence with numbers', () => {
        let camelCase = makeCamelCaseFromString('are you 14 years old');
        expect(camelCase).to.equal('areYou14YearsOld')
    });
    it('should return correctly sentence with symbols', () => {
        let camelCase = makeCamelCaseFromString('you must ! do ! it!');
        expect(camelCase).to.equal('youMust!do!it!')
    });
});