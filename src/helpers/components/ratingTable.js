import React from "react";

import {Table} from "../../components/table/table";

export const RatingTable = ({players}) => {

    const makeElement = string => <p className='text'>{string}</p>;
    const columnStyles = new Map();
    columnStyles.set([1,2, 3], {width: '70px'});
    const styles = {columnsStyles: columnStyles};


    const columns = ['player', 'win', 'loose', 'points'];
    const rows = players.map(player => {
        return {
            player: makeElement(player.nickname),
            win: makeElement(player.win) || makeElement(0),
            loose: makeElement(player.loose) || makeElement(0),
            points: makeElement(player.points) || makeElement(0)
        }

    });
    return <Table columns={columns}
                  rows={rows}
                  styles={styles}
    />
};