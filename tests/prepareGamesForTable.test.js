import {prepareGamesForTable} from "../src/helpers/prepareGamesForTable";
import React, {Fragment} from "react";

let hundredYearsWar = require('../__mocks__/games.json');

describe('prepareGamesForTable() ', () => {
    let component;
    beforeEach(()=>{
        let games = prepareGamesForTable(hundredYearsWar);
        component = mount(
            <div>
                {games.map((game, index)=>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>)
    });
    afterEach(()=>{
        component.unmount();
    });
    it('should contain not-empty fields \'team\', \'score\', \'opponent\'', () => {
        let team = component.find('p').filterWhere(node => node.props().test === 'team');
        let opponent = component.find('p').filterWhere(node => node.props().test === 'opponent');
        let score = component.find('p').filterWhere(node => node.props().test === 'score');

        expect(team.length).to.equal(hundredYearsWar.length);
        expect(opponent.length).to.equal(hundredYearsWar.length);
        expect(score.length).to.equal(hundredYearsWar.length);
    });

});