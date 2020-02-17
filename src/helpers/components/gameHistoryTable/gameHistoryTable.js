import React, {useState, Fragment, useEffect} from "react";
import {CSSTransition} from "react-transition-group";

import {Table} from "../../../components/table/table";
import {prepareGamesForTable} from "../../prepareGamesForTable";
import {getGames} from "../../requests/getGames";
import {useAuth} from "../../auth&route/authContext";
import {useGlobal} from "../../../store";

import './gameHistoryTable.css'

const GameHistoryTable = ({changeState, room, games}) => {

    const [gamesState, setGames] = useState(games);

    const {user} = useAuth();
    const [globalState, globalActions] = useGlobal();
    const players = globalState.players;

    const [end, doEnd] = useState(games.games.length < 5);
    const textMore = 'Show more games';
    const textEnd = 'All games have been downloaded.';


    const getGamesSuccess = (games) => {
        if (games[games.length - 1].id === gamesState.lastGameId) doEnd(true);
        setGames(prevState => {
            return { ...prevState,
                games: prevState.games.length > 0
                    ? [...prevState.games, ...games]
                    : [...games],
                previousId: games.length > 0
                    ? games[games.length - 1].id
                    : '',
            }
        });
    };
    const onError = (e) => globalActions.setPopup({error: e});

    const getMoreGames = () => {
        getGames(user, room.id, gamesState.previousId, onError)
            .then((games)=>{
                getGamesSuccess(games)
            })
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
    const rows = gamesState ? prepareGamesForTable(gamesState.games, players) : [];
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
                       unmountOnExit>
            <Fragment>
                <Table columns={columns}
                       rows={rows}
                       styles={styles}
                       text={text}
                />
                {rows.length > 0 && <div className='container margin_15'>
                    {end
                        ? <p className={'text text_link_disabled'}
                        >{textEnd}</p>
                        : <p className={'text text_link'} onClick={getMoreGames}
                        >{textMore}</p>}

                </div>}
            </Fragment>
        </CSSTransition>
    </Fragment>
};

export default GameHistoryTable;