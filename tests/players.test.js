import React from 'react';
import {Players} from '../src/components/players/players'

describe('Players ', () => {
    const textWithPlayers = 'Players:';
    const textWithoutPlayers = 'There are no players yet.';
    const users = [{id:'0', nickname:'Hulk'}, {id: '1', nickname:'Iron Man'}, {id:'2', nickname:'Ms. Marvel'}];
    const noUsers = [];
    it('should have text \'Players\'', () => {
        const wrapper = shallow(<Players players={users}/>);
        expect(wrapper.children().findWhere(node => node.text()===textWithPlayers).length).to.equal(2) // because  of <div><p>Players:</p></div> - 2 nodes with this text
    });
    it('should have other text if props. array is empty', () => {
        let wrapper = shallow(<Players players={noUsers}/>);
        expect(wrapper.children().findWhere(node => node.text()===textWithoutPlayers).length).to.equal(2)
    });
    it('should render all users', () => {
        let wrapper = shallow(<Players players={users}/>);
        expect(wrapper.children().length).to.equal(users.length + 1)
    });
});