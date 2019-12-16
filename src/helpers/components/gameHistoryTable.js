import React from "react";

import {Table} from "../../components/table/table";

import {prepareGamesForTable} from "../prepareGamesForTable";

const GameHistoryTable = ({games}) => {

    const columns = ['team', 'score', 'opponent'];
    const columnsStyles = new Map();
    columnsStyles.set([1], {width: '70px'});
    const styles = {columnsStyles: columnsStyles};
    const rows = prepareGamesForTable(games);

    return <Table columns={columns}
                  rows={rows}
                  styles={styles}
    />
};

export default GameHistoryTable;