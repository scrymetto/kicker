import React from 'react';
import App from "../src/App";

describe('App', () => {
    let wrapper = mount(<App/>);
    it('should render without problem', () => {
        expect(wrapper.find(App).length).to.equal(1)
    });
    it('should contain <Header\/> with class header_main', () => {
        let header = wrapper.findWhere(node => node.props().text === 'Let\'s play kicker!');
        expect(header.length).to.equal(1)
    });
    it('should have empty context, when it starts', () => {
        let header = wrapper.findWhere(node => node.text() === 'Hi, stranger!');
        expect(header).to.exist;
    });
    it('should render card with rooms, if context doesn\'t empty', () => {
        localStorage.setItem('token', 'true');
        let wrapper2 = mount(<App/>);
        expect(wrapper2.findWhere(node => node.text() === 'Your rooms')).to.exist;
        localStorage.clear();
    });

});
