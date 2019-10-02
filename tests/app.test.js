import React from 'react';
import App from "../src/App";

describe('App', () => {
    let wrapper = mount(<App/>);
    it('Should render without problem', () => {
        expect(wrapper.find(App).length).to.equal(1)
    });
    it('Should contain <Header\/> with class header_main', () => {
        let header = wrapper.findWhere(node => node.props().text === 'Let\'s play kicker!');
        expect(header.length).to.equal(1)
    });
});
