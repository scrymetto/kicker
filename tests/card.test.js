import React from "react";
import {Context} from "./helpers";
import {Card} from "../src/components/card/card";
import Header from "../src/components/header/header";
import {Button} from "../src/components/button/button";

describe('Card', () => {
    let renderProp = () => <p>Some test text</p>;
    let wrapper = mount(<Context><Card button_back render={() => (<button/>)}/></Context>);
    let wrapper2 = mount(<Context><Card render={() => renderProp()}/></Context>);
    it('should have class .card', () => {
        expect(wrapper.getDOMNode().className).to.equal('card')
    });
    it('should contain header', () => {
        expect(wrapper.contains(<Header/>)).to.equal(true)
    });
    it('should have one button with class\'back\', if has prop button_back', () => {
        expect(wrapper.contains(<Button className='button button_back'/>)).to.equal(true);
    });
    it('should NOT have a button with class\'back\', if doesn\'t have prop button_back', () => {
        expect(wrapper2.contains(<Button className='button button_back'/>)).to.equal(false);
    });
    it('should render the prop \'render\'', () => {
        expect(wrapper2.contains(renderProp)).to.equal(true);
    })
});