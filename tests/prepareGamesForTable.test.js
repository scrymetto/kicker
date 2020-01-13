import {prepareGamesForTable} from "../src/helpers/prepareGamesForTable";
import React, {Fragment} from "react";

const hundredYearsWar = require('../__mocks__/games.json');
const historyPlayers = require('../__mocks__/historyPlayers.json');

describe('prepareGamesForTable() ', () => {
    let component;
    afterEach(() => {
        component.unmount();
    });

    const games = prepareGamesForTable(hundredYearsWar, historyPlayers);
    const empty = prepareGamesForTable([{
        firstTeam: {},
        secondTeam: {}
    }], {});

    it('should return an obj with custom fields \'score\', \'opponent\', count of elements in each field must be like count of games', () => {
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        const team = component.find('[data-testid="firstTeamPlayers"]');
        const opponent = component.find('[data-testid="secondTeamPlayers"]');
        const score = component.find('[data-testid="score"]');

        expect(team.length).to.equal(hundredYearsWar.length);
        expect(opponent.length).to.equal(hundredYearsWar.length);
        expect(score.length).to.equal(hundredYearsWar.length);
    });
    it('should return an obj with custom fields \'team\', \'score\', \'opponent\', even \'games\' don\'t have them', () => {
        component = mount(
            <div>
                {empty.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        const team = component.find('[data-testid="firstTeamPlayers"]');
        const opponent = component.find('[data-testid="secondTeamPlayers"]');
        const score = component.find('[data-testid="score"]');

        expect(team.length).to.equal(0);
        expect(opponent.length).to.equal(0);
        expect(score.length).to.equal(0);
    });

    it('should return the correct score', ()=>{
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        const score = component.find('[data-testid="score"]').map(node => node.text());
        for (let i=0; i<hundredYearsWar.length; i++){
            const currentGame = score[i];
            const firstTeamScore = hundredYearsWar[i].firstScore;
            const secondTeamScore = hundredYearsWar[i].secondScore;
            expect(firstTeamScore).to.equal(+currentGame[0]);
            expect(secondTeamScore).to.equal(+currentGame[currentGame.length-1])
        }
    });

    // it('should return the correct team names', () => {
    //     component = mount(
    //         <div>
    //             {games.map((game, index) =>
    //                 <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
    //         </div>);
    //     for (let i = 0; i < games.length; i++) {
    //         let team = component.find('[data-testid="team"]').map((node) => node.text())[i];
    //         expect(team).to.equal(hundredYearsWar[i].firstTeam.name);
    //         let opponent = component.find('[data-testid="opponent"]').map((node) => node.text())[i];
    //         expect(opponent).to.equal(hundredYearsWar[i].secondTeam.name);
    //     }
    // });
    // it('should return the correct team names, if \'games\' don\'t have this CustomField', () => {
    //     component = mount(
    //         <div>
    //             {empty.map((game, index) =>
    //                 <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
    //         </div>);
    //     let team = component.find('[data-testid="team"]');
    //     let opponent = component.find('[data-testid="opponent"]');
    //
    //     expect(team.props().children).to.equal('Unnamed team');
    //     expect(opponent.props().children).to.equal('Unnamed team');
    // });
});