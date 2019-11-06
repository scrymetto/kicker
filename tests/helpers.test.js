import React from 'react';

import {makeCamelCaseFromString} from "../src/helpers/makeCamelCaseFromString"
import {makeFirstLetterUppercase} from "../src/helpers/makeFirstLetterUppercase"
import {prepareDataForRequest} from "../src/helpers/requests/prepareDataForRequest"
import {makeArrayFromObjAndTemplate} from "../src/helpers/makeArrayFromObjAndTemplate"

describe('makeCamelCaseFromString() ', () => {
    it('should return correctly sentence with all letters', () => {
        let camelCase = makeCamelCaseFromString('Zed\'s dead baby');
        expect(camelCase).to.equal('Zed\'sDeadBaby')
    });
    it('should return correctly sentence with numbers', () => {
        let camelCase = makeCamelCaseFromString('Ezekiel 25:17 - The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men');
        expect(camelCase).to.equal('Ezekiel25:17-ThePathOfTheRighteousManIsBesetOnAllSidesByTheInequitiesOfTheSelfishAndTheTyrannyOfEvilMen');
    });
    it('should return correctly sentence with symbols', () => {
        let camelCase = makeCamelCaseFromString('say \"what\" again! say \"what\" again! i dare you!');
        expect(camelCase).to.equal('say\"what\"Again!Say\"what\"Again!IDareYou!')
    });
});

describe('makeFirstLetterUppercase() ', () => {
    it('should return correct sentence', () => {
        let firstUppercaseLetter = makeFirstLetterUppercase('i love you, Pumpkin');
        expect(firstUppercaseLetter).to.equal('I love you, Pumpkin')
    })
});

describe('prepareDataForRequest() ', () => {
    it('should return object with all properties', () => {
        let template = ['name', 'profession'];
        let values = {
            name: 'Vincent Vega',
            actor: 'John Travolta',
            profession: 'Hitman'
        };
        let data = prepareDataForRequest(template, values);
        for (let i = 0; i < template.length; i++) {
            expect(data).to.have.property(template[i]);
        }
        for (let key in values) {
            if (template.indexOf(key) < 0) {
                expect(data).to.not.have.property(key)
            }
        }
    });
});

describe('makeArrayFromObjAndTemplate() ', () => {
    let template = ['name', 'profession', 'actor'];
    let obj = {profession: 'Wife of crime lord', actor: 'Uma Thurman', name: 'Mia Wallace'};
    let result = makeArrayFromObjAndTemplate(obj, template);
    for (let i=0; i<template.length; i++) {
        expect(result[i]).to.equal(obj[template[i]])
    }
});