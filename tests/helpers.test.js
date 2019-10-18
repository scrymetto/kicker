import React from 'react';

import {makeCamelCaseFromString} from "../src/helpers/makeCamelCaseFromString"
import {makeFirstLetterUppercase} from "../src/helpers/makeFirstLetterUppercase"
import {prepareDataForRequest} from "../src/helpers/requests/prepareDataForRequest"

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