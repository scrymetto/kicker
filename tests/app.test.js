import React from 'react';
import App from "../src/App";
import {act} from 'react-dom/test-utils';

//TODO What the f*** ?! how test it?

describe('App', () => {
    let wrapper;
    // it('should render without problem', () => {
    //     act(() => {
    //         wrapper = shallow(<App/>);
    //     });
    //     expect(wrapper.find(App).length).to.equal(1)
    // });
    it('should contain <Header\/> with class header_main', () => {
        act(() => {
            wrapper = shallow(<App/>);
        });
        let header = wrapper.findWhere(node => node.props().text === 'Let\'s play kicker!');
        expect(header.length).to.equal(1)
    });
    // it('should have empty context, when it starts', () => {
    //     act(() => {
    //         wrapper = mount(<App/>);
    //     });
    //     console.dir(wrapper)
    //     let header = wrapper.findWhere(node => node.text() === 'Hi, stranger!');
    //     expect((header).length).to.equal(1);
    // });

    // it('should render card with rooms, if context doesn\'t empty', () => {
    //     // localStorage.setItem('token', 'true');
    //     let wrapper2 = mount(<App/>);
    //     expect(wrapper2.findWhere(node => node.text() === 'Your rooms').length).to.equal(1);
    //     // localStorage.clear();
    // });

});
