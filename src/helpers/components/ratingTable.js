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
            const win = Number.parseInt(player.win);
            const loose = Number.parseInt(player.loose);
            return {
                player: makeElement(player.nickname),
                'win/ loose': makeElement(win + '/' + loose) || makeElement(0 + '/' + 0),
                winrate: makeElement(Math.round(win / (win + loose) * 100) + '%'),
                points: makeElement(player.points) || makeElement(0)
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
