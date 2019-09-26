import React from 'react';

import Header from "../src/components/header/header";
import {Button} from "../src/components/button/button";
import Menu from "../src/components/menu/menu";

import {makeCamelCaseFromString} from "../src/helpers/makeCamelCaseFromString"
import {makeFirstLetterUppercase} from "../src/helpers/makeFirstLetterUppercase"
import {prepareDataForRequest} from "../src/helpers/prepareDataForRequest"
import {Context, EmptyContext} from "./helpers";




describe('Main header', () => {
    let wrapper = mount(<Context><Header className='header_main' text="test"/></Context>);
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

describe('Card header', () => {
    let wrapper = mount(<Context><Header text="test"/></Context>);
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

describe('Menu', () => {
    let wrapper = mount(<Context><Menu className='meh'/></Context>);
    let wrapper2 = mount(<EmptyContext><Menu className='meh'/></EmptyContext>);
    it('should have class .meh', () => {
        expect(wrapper.getDOMNode().className).to.equal('menu meh');
        expect(wrapper2.getDOMNode().className).to.equal('menu meh')
    })
});

describe('makeCamelCaseFromString', () => {
    it('should return correctly sentence with all letters', () => {
        let camelCase = makeCamelCaseFromString('save me from me');
        expect(camelCase).to.equal('saveMeFromMe')
    });
    it('should return correctly sentence with numbers', () => {
        let camelCase = makeCamelCaseFromString('you are 14 years old');
        expect(camelCase).to.equal('youAre14YearsOld')
    });
    it('should return correctly sentence with symbols', () => {
        let camelCase = makeCamelCaseFromString('you must ! do ! it !');
        expect(camelCase).to.equal('youMust!Do!It!')
    });
});

describe('makeFirstLetterUppercase', () => {
    it('should return correct sentence', () => {
        let firstUppercaseLetter = makeFirstLetterUppercase('save me from me');
        expect(firstUppercaseLetter).to.equal('Save me from me')
    })
});

describe('prepareDataForRequest', () => {
    it('should return object with all properties', () => {
        let template = ['name', 'age', 'email'];
        let values = {
            name: 'Jonny',
            age: 14,
            email: 'iFeelMyself@good.yeah'
        };
        let data = prepareDataForRequest(template, values);
        for (let i = 0; i < template.lenght; i++) {
            expect(data).to.have.property(template[i]);
        }
    });
});