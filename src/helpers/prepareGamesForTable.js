import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'

export const prepareGamesForTable = (games) => {

    return games.map((game) => {
        const {firstTeam, secondTeam} = game;
        const {name: firstTeamName = 'Unnamed team', points: firstTeamScore} = firstTeam;
        const {name: secondTeamName = 'Unnamed team', points: secondTeamScore} = secondTeam;
        const firstTeamPlayers = firstTeam.players ? prepareStringWithPlayers(firstTeam.players) : null;
        const secondTeamPlayers = secondTeam.players ? prepareStringWithPlayers(secondTeam.players) : null;
        const firstTeamCell =
            <Fragment>
                <p className='text text_oblique' data-testid='team'>
                    {firstTeamName}
                </p>
                {firstTeamPlayers && <p className='text text_additional' data-testid='players'>
                    {firstTeamPlayers}
                </p>}
            </Fragment>;
        const secondTeamCell =
            <Fragment>
                <p className='text text_oblique' data-testid='opponent'>
                    {secondTeamName}
                </p>
                {secondTeamPlayers && <p className='text text_additional' data-testid='players'>
                    {secondTeamPlayers}
                </p>}
            </Fragment>;
        const score = <p className='text' data-testid='score'>{firstTeamScore} : {secondTeamScore}</p>;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

