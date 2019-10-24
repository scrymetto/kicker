import React from 'react';
import {Paper} from '../src/components/paper/paper'

describe('Paper ', () => {
    let players = ['Balakirev', 'Cui', 'Mussorgsky', 'Rimsky-Korsakov', 'Borodin'];
    let admin = 'Balakirev';
    let name = 'The Mighty Group';
    let wrapper = shallow(<Paper players={players} admin={admin} name={name}/>);
    it('should render <Players/> with correct props', () => {
        let playersComponent = wrapper.findWhere(node => node.props().players === players);
        expect(playersComponent.length).to.equal(1)
    });
    it('should render name of room', function () {
        let nameParagraph = wrapper.findWhere(node => node.hasClass('text_header') && node.text() === name);
        expect(nameParagraph.length).to.equal(1)
    });
    it('should render name of room', function () {
        let adminParagraph = wrapper.findWhere(node => {
            return node.hasClass('text_additional') && node.text() === 'Admin of this room: ' + admin
        });
        expect(adminParagraph.length).to.equal(1)
    });
});