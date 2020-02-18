import React, {useState, Fragment, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import axios from "axios";

import {Table} from "../../../components/table/table";
import {Spinner} from "../../../components/spinner/spinner";

import {prepareGamesForTable} from "../../prepareGamesForTable";
import {getGames} from "../../requests/getGames";
import {getTheLastGameId} from "../../requests/getTheLastGameId";
import {useAuth} from "../../auth&route/authContext";
import {useGlobal} from "../../../store";

import './gameHistoryTable.css'

const GameHistoryTable = ({changeState, room}) => {

    const [gamesState, setGames] = useState({games: [], previousId: '', lastGameId: ''});

    const {user} = useAuth();
    const [globalState, globalActions] = useGlobal();
    const players = globalState.players;

    const textMore = 'Show more games';
    const textEnd = 'All games have been downloaded.';
    const [spinner, showSpinner] = useState({main: true, helper: false});
    const [end, doEnd] = useState(false);

    useEffect(() => {
        axios.all([getGames(user, room.id, ''), getTheLastGameId(user, room.id, onError)])
            .then(axios.spread(function (games, lastId) {
                if (!games[0]) {
                    doEnd(true);
                    return
                }
                if (games[games.length - 1].id === lastId) {
                    doEnd(true)
                }
                if (!games[0]) {
                    showSpinner((prev) => {
                        return {...prev, main: false}
                    });
                }
                setGames({
                    games: games,
                    previousId: games[games.length - 1].id,
                    lastGameId: lastId
                })
            }))
            .then(() => {
                showSpinner((prev) => {
                    return {...prev, main: false}
                })
            })
            .catch(e => {
                onError(e.message)
            });
    }, []);


    const getGamesSuccess = (games) => {
        if (games[games.length - 1].id === gamesState.lastGameId) doEnd(true);
        setGames(prevState => {
            return {
                ...prevState,
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
        showSpinner((prev) => {
            return {...prev, helper: true}
        });
        getGames(user, room.id, gamesState.previousId)
            .then((games) => {
                getGamesSuccess(games)
            })
            .then(() => {
                showSpinner((prev) => {
                    return {...prev, helper: false}
                })
            })
            .catch(e => {
                onError(e.message)
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


    return spinner.main
        ? <Spinner/>
        : <Fragment>
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
                        {spinner.helper && <Spinner/>}
                    </div>}
                </Fragment>
            </CSSTransition>
        </Fragment>
};

export default GameHistoryTable;