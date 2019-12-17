import React, {useState, Fragment} from "react";
import {CSSTransition} from "react-transition-group";

import {Table} from "../../../components/table/table";
import {prepareGamesForTable} from "../../prepareGamesForTable";

import './gameHistoryTable.css'

const GameHistoryTable = ({games, changeState}) => {

    const [inProp, setInProp] = useState(true);

    const closeHistory = () => {
      setInProp(false);
      setTimeout(changeState, 300, false)
    };

    const columns = ['team', 'score', 'opponent'];
    const columnsStyles = new Map();
    columnsStyles.set([1], {width: '70px'});
    const styles = {columnsStyles: columnsStyles};
    const rows = prepareGamesForTable(games);

    return <Fragment>
        <div className='container margin_15'>
            <p className='text text_link' onClick={closeHistory}
            >Hide game history</p>
        </div>
        <CSSTransition in={inProp}
                       timeout={300}
                       classNames='gameHistory'
                       appear>
            <Table columns={columns}
                   rows={rows}
                   styles={styles}
            />
        </CSSTransition>
    </Fragment>
};

export default GameHistoryTable;