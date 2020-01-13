import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'

export const prepareGamesForTable = (games, players) => {

    return games.map((game) => {
        const {firstTeam, secondTeam, firstScore, secondScore} = game;
        // const {name: firstTeamName = 'Unnamed team'} = firstTeam;
        // const {name: secondTeamName = 'Unnamed team'} = secondTeam;
        const firstTeamPlayers = firstTeam.players ? prepareStringWithPlayers(firstTeam.players, players) : '';
        const secondTeamPlayers = secondTeam.players ? prepareStringWithPlayers(secondTeam.players, players) : '';
        const firstTeamCell =
            <Fragment>
                {/*<p className='text text_oblique' data-testid='team'>
                    {firstTeamName}
                </p>*/}
                {firstTeamPlayers && <p className='text text_additional' data-testid='firstTeamPlayers'>
                    {firstTeamPlayers}
                </p>}
            </Fragment>;
        const secondTeamCell =
            <Fragment>
                {/*<p className='text text_oblique' data-testid='opponent'>
                    {secondTeamName}
                </p>*/}
                {secondTeamPlayers && <p className='text text_additional' data-testid='secondTeamPlayers'>
                    {secondTeamPlayers}
                </p>}
            </Fragment>;
        const score = (firstScore || secondScore) &&
            <p className='text' data-testid='score'>{firstScore} : {secondScore}</p>;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

