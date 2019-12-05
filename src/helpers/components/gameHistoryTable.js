import {prepareGamesForTable} from "../prepareGamesForTable";
import {Table} from "../../components/table/table";
import React from "react";

export const GameHistoryTable = ({games}) => {

    const columns = ['team', 'score', 'opponent'];
    const columnsStyles = new Map();
    columnsStyles.set([1], {width: '70px'});
    const styles = {columnsStyles: columnsStyles};
    let rows = prepareGamesForTable(games);

    return <Table columns={columns}
                  rows={rows}
                  styles={styles}
    />
};