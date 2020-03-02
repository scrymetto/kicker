import React, {useEffect, useState} from 'react';

import {useGlobal} from "../../store";
import {useAuth} from "../auth&route/authContext";

import {Table} from "../../components/table/table";
import {Spinner} from "../../components/spinner/spinner";
import {ErrorComponent} from "./errorComponent";

import {getStatisticData} from "../requests/getStatisticData";
import {setErrorPopup} from "../setErrorPopup";

export const RatingTable = ({room, rerender}) => {

    const [isUploaded, setUploaded] = useState({loading: true, done: false, error: false});
    const [players, setPlayers] = useState([]);

    const globalActions = useGlobal()[1];
    const {user} = useAuth();

    useEffect(() => {
        getStatisticData(user, room.id)
            .then((statisticData) => {
                setPlayers(statisticData);
            })
            .then(() => setUploaded({loading: false, done: true, error: false}))
            .catch(e => {
                setErrorPopup(e, globalActions.setPopup);
                setUploaded({loading: false, done: false, error: true})
            })
    }, [rerender]);

    const columns = ['player', 'points', 'win/ loose/ draw', 'winrate'];

    const makeElement = string => <p className='text'>{string}</p>;

    const width = {width: '70px'};
    const columnStyles = new Array(columns.length).fill(width, 1, columns.length);
    const styles = {columnsStyles: columnStyles};

    const rows = players[0]
        ? players.map(player => {
            const win = player.win || 0;
            const loose = player.loose || 0;
            const draw = player.draw || 0;
            const winrate = player.winrate.toFixed(2) || 0;
            const points = player.rating || 0;
            return {
                player: makeElement(player.player.nickname),
                points: makeElement(points),
                'win/ loose/ draw': makeElement(win + '/' + loose + '/' + draw),
                winrate: makeElement(winrate)
            }
        })
        : null;

    const text = rows ? '' : 'You have not played any games.';
    return <>
        {isUploaded.loading && <Spinner/>}

        {isUploaded.error && <ErrorComponent/>}

        {isUploaded.done && <Table columns={columns}
                                   rows={rows}
                                   styles={styles}
                                   text={text}
        />}
    </>

};
