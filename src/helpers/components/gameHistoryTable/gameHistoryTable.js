import React, {useState, Fragment} from "react";
import {CSSTransition} from "react-transition-group";

import {Table} from "../../../components/table/table";
import {prepareGamesForTable} from "../../prepareGamesForTable";
import {getGames} from "../../requests/getGames";
import {useAuth} from "../../auth&route/authContext";
import {useGlobal} from "../../../store";

import './gameHistoryTable.css'

let page = 1;

const GameHistoryTable = ({changeState, room}) => {

    const {user} = useAuth();
    const [globalState, globalActions] = useGlobal();

    const [gamesState, setGames] = useState(globalState.games);
    const [end, doEnd] = useState(false);
    const textMore = 'Show more games';
    const textEnd = 'All games have been downloaded.';

    const getGamesSuccess = (games) => {
        if (games.length < 5) doEnd(true);
        setGames(prev => {
            return prev.length > 0
                ? [...prev, ...games]
                : [...games]
        })
    };
    const onError = (e) => globalActions.setPopup({error: e});

    const getMoreGames = () => {
        getGames(user, room.id, page, getGamesSuccess, onError)
            .then(() => page++)
    };

    const [inProp, setInProp] = useState(true);

    const closeHistory = () => {
        setInProp(false);
        setTimeout(changeState, 300, false)
    };

    const columns = ['team', 'score', 'opponent'];
    const columnsStyles = new Array(columns.length);
    columnsStyles[1] = {width: '70px'};
    const styles = {columnsStyles: columnsStyles};
    const rows = gamesState ? prepareGamesForTable(gamesState) : [];
    const text = rows[0] ? '' : 'Your games\' history is empty.';


    return <Fragment>
        <div className='container margin_15'>
            <p className='text text_link' onClick={closeHistory}
            >Hide game history</p>
        </div>
        <CSSTransition in={inProp}
                       timeout={300}
                       classNames='gameHistory'
                       appear
                       onExited={() => page = 0}>
            <Fragment>
                <Table columns={columns}
                       rows={rows}
                       styles={styles}
                       text={text}
                />
                {rows.length > 5 && <div className='container margin_15'>
                    <p className={end ? 'text text_link_disabled' : 'text text_link'} onClick={getMoreGames}
                    >{end ? textEnd : textMore}</p>
                </div>}
            </Fragment>
        </CSSTransition>
    </Fragment>
};

export default GameHistoryTable;