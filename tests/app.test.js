import React from 'react';
import App from "../src/App";
import Header from "../src/components/header/header";

describe('App', () => {
    let wrapper = mount(<App/>);
    it('Should render without problem', () => {
        expect(wrapper.find(App).length).to.equal(1)
    });
    it('Should contain <Header\/> with class header_main', () => {
        expect(wrapper.find(Header).hasClass('header_main')).to.equal(true)
    });
});
