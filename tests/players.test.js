import React from 'react';
import {Players} from '../src/components/players/players'

describe('Players ', () => {
    let label = <p className='text text_additional'>Players: </p>;
    let emptyLabel = <p className='text text_additional'>There are no players yet.</p>;
    let users = [{id:0, name:'Hulk'}, {id: 1, name:'Iron Man'}, {id:1, name:'Ms. Marvel'}];
    let noUsers = [];
    it('should have text \'Players\'', () => {
        let wrapper = shallow(<Players players={users}/>);
        expect(wrapper.contains(label)).to.equal(true)
    });
    it('should have other text if props. array is empty', () => {
        let wrapper = shallow(<Players players={noUsers}/>);
        expect(wrapper.contains(emptyLabel)).to.equal(true)
    });
    it('should render all users', () => {
        let wrapper = shallow(<Players players={users}/>);
        expect(wrapper.children().length).to.equal(users.length + 1)
    });
});