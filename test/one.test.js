import {expect} from 'chai';
import Rechnen from "../src/components/card/rechnen";

global.expect = expect;

it('should richtig rechnen', function () {
    let a = 4;
    let b = 6;
    expect(Rechnen(a, b)).to.equal(10)
});