import React, {Fragment} from 'react';
import {prepareStringWithPlayers} from "./prepareStringWithPlayers";
import '../components/text/text_oblique.css'
import {useGlobal} from "../store";

export const prepareGamesForTable = (games) => {

    const [globalState, globalActions] = useGlobal();
    const players = globalState.players;

    console.log(games)
    return games.map((game) => {
        const {firstTeam, secondTeam, firstScore, secondScore} = game;
        // const {name: firstTeamName = 'Unnamed team'} = firstTeam;
        // const {name: secondTeamName = 'Unnamed team'} = secondTeam;
        const firstTeamPlayers = prepareStringWithPlayers(firstTeam, players);
        const secondTeamPlayers = prepareStringWithPlayers(secondTeam, players);
        const firstTeamCell =
            <Fragment>
                {/*<p className='text text_oblique' data-testid='team'>
                    {firstTeamName}
                </p>*/}
                {firstTeamPlayers && <p className='text text_additional' data-testid='players'>
                    {firstTeamPlayers}
                </p>}
            </Fragment>;
        const secondTeamCell =
            <Fragment>
                {/*<p className='text text_oblique' data-testid='opponent'>
                    {secondTeamName}
                </p>*/}
                {secondTeamPlayers && <p className='text text_additional' data-testid='players'>
                    {secondTeamPlayers}
                </p>}
            </Fragment>;
        const score = <p className='text' data-testid='score'>{firstScore} : {secondScore}</p>;
        return {
            team: firstTeamCell,
            score: score,
            opponent: secondTeamCell
        }
    })
};

