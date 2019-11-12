import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'

export const prepareGamesForTable = (games) => {

    return games.map((game) => {
        let {firstTeam, secondTeam} = game;
        let {name: firstTeamName = 'Unnamed team', points: firstTeamScore = '-'} = firstTeam;
        let {name: secondTeamName = 'Unnamed team', points: secondTeamScore = '-'} = secondTeam;
        let firstTeamPlayers = prepareStringWithPlayers(firstTeam.players);
        let secondTeamPlayers = prepareStringWithPlayers(secondTeam.players);
        let firstTeamCell =
            <Fragment>
                <p className='text text_oblique' test='team'>
                    {firstTeamName}
                </p>
                <p className='text text_additional'>
                    {firstTeamPlayers}
                </p>
            </Fragment>;
        let secondTeamCell =
            <Fragment>
                <p className='text text_oblique' test='opponent'>
                    {secondTeamName}
                </p>
                <p className='text text_additional'>
                    {secondTeamPlayers}
                </p>
            </Fragment>;
        let score = <p className='text' test='score'>{firstTeamScore} + ':' + {secondTeamScore}</p>;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

