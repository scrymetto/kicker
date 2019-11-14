import {prepareGamesForTable} from "../src/helpers/prepareGamesForTable";
import React, {Fragment} from "react";

let hundredYearsWar = require('../__mocks__/games.json');

describe('prepareGamesForTable() ', () => {
    let component;
    afterEach(() => {
        component.unmount();
    });

    let games = prepareGamesForTable(hundredYearsWar);
    let empty = prepareGamesForTable([{
        firstTeam: {},
        secondTeam: {}
    }]);

    it('should return an obj with fields \'team\', \'score\', \'opponent\', count of elements in each field must be like count of games', () => {
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let team = component.find('[data-testid="team"]');
        let opponent = component.find('[data-testid="opponent"]');
        let score = component.find('[data-testid="score"]');

        expect(team.length).to.equal(hundredYearsWar.length);
        expect(opponent.length).to.equal(hundredYearsWar.length);
        expect(score.length).to.equal(hundredYearsWar.length);
    });
    it('should return an obj with fields \'team\', \'score\', \'opponent\', even \'games\' don\'t have them', () => {
        component = mount(
            <div>
                {empty.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let team = component.find('[data-testid="team"]');
        let opponent = component.find('[data-testid="opponent"]');
        let score = component.find('[data-testid="score"]');

        expect(team.length).to.equal(empty.length);
        expect(opponent.length).to.equal(empty.length);
        expect(score.length).to.equal(empty.length);
    });
    it('should return the correct team names', () => {
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        for (let i = 0; i < games.length; i++) {
            let team = component.find('[data-testid="team"]').map((node) => node.text())[i];
            expect(team).to.equal(hundredYearsWar[i].firstTeam.name);
            let opponent = component.find('[data-testid="opponent"]').map((node) => node.text())[i];
            expect(opponent).to.equal(hundredYearsWar[i].secondTeam.name);
        }
    });
    it('should return the correct team names, if \'games\' don\'t have this fields', () => {
        component = mount(
            <div>
                {empty.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let team = component.find('[data-testid="team"]');
        let opponent = component.find('[data-testid="opponent"]');

        expect(team.props().children).to.equal('Unnamed team');
        expect(opponent.props().children).to.equal('Unnamed team');
    });
    it('should return the string with players, if there are some players', () => {
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let players = component.find('[data-testid="players"]').map(node => node.text());
        let dataPlayers = 0;
        for (let i = 0; i < hundredYearsWar.length; i++) {
            dataPlayers += hundredYearsWar[i].firstTeam.players ? 1 : 0;
            dataPlayers += hundredYearsWar[i].secondTeam.players ? 1 : 0;
        }
        expect(players.length).to.equal(dataPlayers)
    });
    it('should NOT return the string with players, if there are no players', () => {
        component = mount(
            <div>
                {empty.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let players = component.find('[data-testid="players"]').map(node => node.text());
        expect(players.length).to.equal(0)
    });
    it('should return the correct score', ()=>{
        component = mount(
            <div>
                {games.map((game, index) =>
                    <Fragment key={index}>{game.team} {game.score} {game.opponent}</Fragment>)}
            </div>);
        let score = component.find('[data-testid="score"]').map(node => node.text());
        for (let i=0; i<hundredYearsWar.length; i++){
            let currentGame = score[i];
            let firstTeamScore = hundredYearsWar[i].firstTeam.points;
            let secondTeamScore = hundredYearsWar[i].secondTeam.points;
            expect(firstTeamScore).to.equal(+currentGame[0]);
            expect(secondTeamScore).to.equal(+currentGame[currentGame.length-1])
        }
    });
});