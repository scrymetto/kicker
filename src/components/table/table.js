import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";
import {makeArrayFromObjAndTemplate} from "../../helpers/makeArrayFromObjAndTemplate";
import './table.css'
import {prepareStylesForTable} from "../../helpers/prepareStylesForTable";

export const Table = (props) => {
    const {columns, rows, styles} = props;
    let columnsStyles = styles.columnsStyles ? prepareStylesForTable(styles.columnsStyles) : [];
    let rowsStyles = styles.rowsStyles ? prepareStylesForTable(styles.rowsStyles) : [];

    return <Fragment>
        <table className='table'>
            <thead>
            <tr className='table table__columns'>
                {columns.map((cell, index) => {
                    let styles = {};
                    if (rowsStyles[0]) styles = Object.assign(styles, rowsStyles[0]);
                    if (columnsStyles[index]) styles = Object.assign(styles, columnsStyles[index]);
                    let capital = makeFirstLetterUppercase(cell);
                    return <th key={index} style={styles}>{capital}</th>
                })
                }
            </tr>
            </thead>
            <tbody>
            {rows
                ? rows.map((dataCells, rowIndex) => {
                    let row = makeArrayFromObjAndTemplate(dataCells, columns);
                    return <tr className='table table__rows' key={rowIndex}>
                        {row.map((cell, index) => {
                            let styles = {};
                            if (rowsStyles[rowIndex + 1]) styles = Object.assign(styles, rowsStyles[rowIndex + 1]);
                            if (columnsStyles[index]) styles = Object.assign(styles, columnsStyles[index]);
                            return <td key={index} style={styles}>{cell}</td>
                        })}
                    </tr>
                })
                : <Fragment>
                    <tr>
                        <td colSpan={columns.length}>
                            &#128148;
                        </td>
                    </tr>
                    <div className='container margin_15'>
                        <p className='text'>You haven’t played with anyone in this room yet. Let's create a new
                            game!</p>
                    </div>
                </Fragment>}
            </tbody>
        </table>
    </Fragment>
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object), //key = the string from Table.columns; value = React.element
    styles: PropTypes.shape({
        columnsStyles: PropTypes.instanceOf(Map),
        rowsStyles: PropTypes.instanceOf(Map)
    })
};