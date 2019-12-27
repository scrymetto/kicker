import React from "react";

import {Table} from "../../components/table/table";

export const RatingTable = ({players}) => {

    const columns = ['player', 'win/ loose', 'winrate', 'points'];

    const makeElement = string => <p className='text'>{string}</p>;

    const width = {width: '70px'};
    const columnStyles = new Array(columns.length).fill(width, 1, columns.length);
    const styles = {columnsStyles: columnStyles};

    const rows = players[0]
        ? players.map(player => {
            const win = Number.parseInt(player.win)||0;
            const loose = Number.parseInt(player.loose)||0;
            const winrate = Math.round(win / (win + loose) * 100)||0;
            const points = player.points||0;
            return {
                player: makeElement(player.nickname),
                'win/ loose': makeElement(win + '/' + loose),
                winrate: makeElement( winrate+ '%'),
                points: makeElement(points)
            }
        })
        : null;

    const text = rows ? '' : 'You have not played any games.';
    return <Table columns={columns}
                  rows={rows}
                  styles={styles}
                  text={text}
    />
};
