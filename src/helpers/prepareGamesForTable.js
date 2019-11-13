import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'

export const prepareGamesForTable = (games) => {

    return games.map((game) => {
        let {firstTeam, secondTeam} = game;
        let {name: firstTeamName = 'Unnamed team', points: firstTeamScore} = firstTeam;
        let {name: secondTeamName = 'Unnamed team', points: secondTeamScore} = secondTeam;
        let firstTeamPlayers = firstTeam.players ? prepareStringWithPlayers(firstTeam.players) : null;
        let secondTeamPlayers = secondTeam.players ? prepareStringWithPlayers(secondTeam.players) : null;
        let firstTeamCell =
            <Fragment>
                <p className='text text_oblique' data-testid='team'>
                    {firstTeamName}
                </p>
                <p className='text text_additional' data-testid='players'>
                    {firstTeamPlayers}
                </p>
            </Fragment>;
        let secondTeamCell =
            <Fragment>
                <p className='text text_oblique' data-testid='opponent'>
                    {secondTeamName}
                </p>
                <p className='text text_additional' data-testid='players'>
                    {secondTeamPlayers}
                </p>
            </Fragment>;
        let score = <p className='text' data-testid='score'>{firstTeamScore} : {secondTeamScore}</p>;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

