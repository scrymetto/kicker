import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";
import {makeArrayFromObjAndTemplate} from "../../helpers/makeArrayFromObjAndTemplate";
import './table.css'

export const Table = (props) => {
    const {columns, rows, text, styles} = props;
    const columnsStyles = styles ? styles.columnsStyles ? styles.columnsStyles : [] : [];
    const rowsStyles = styles ? styles.rowsStyles ? styles.rowsStyles : [] : [];

    return <Fragment>
        <table className='table'>
            <thead>
            <tr className='table table__columns'>
                {columns.map((cell, index) => {
                    let styles = {};
                    if (rowsStyles[0]) styles = Object.assign(styles, rowsStyles[0]);
                    if (columnsStyles[index]) styles = Object.assign(styles, columnsStyles[index]);
                    const capital = makeFirstLetterUppercase(cell);
                    return <th key={index} style={styles}>{capital}</th>
                })
                }
            </tr>
            </thead>
            <tbody>
            {rows&&rows[0]
                ? rows.map((dataCells, rowIndex) => {
                    const row = makeArrayFromObjAndTemplate(dataCells, columns);
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
                        <td colSpan={columns.length} data-testid='emptyRow'>
                            &#128148;
                        </td>
                    </tr>
                </Fragment>}
            </tbody>
        </table>
        {text && <div className='container margin_15' data-testid='helperText'>
            <p className='text'>{text}</p>
        </div>}
    </Fragment>
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,

    //key = the string from Table.columns; value = React.element
    rows: function (props, propName) {
        const rows = props[propName];
        if (!rows) return;
        if (!Array.isArray(rows)) return new Error(`\'${propName}\' must be an array`);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (let key in row) {
                if (props['columns'].indexOf(key) < 0) {
                    return new Error(`The array '${propName}\' must contain objects, each key of them must be a string from props.columns.`)
                } else {
                    if (!React.isValidElement(row[key])) {
                        return new Error(`The array '${propName}\' must contain objects, each value of them must be a React.Element.`)
                    }
                }
            }
        }
    },
    text: function (props, propName) {
        if(!props['rows']&&!props[propName]){
            return new Error(`If you don't have a prop \'rows\', a prop '${propName}\' is required.`)
        }
    },
    styles: PropTypes.shape({
        columnsStyles: PropTypes.array,
        rowsStyles: PropTypes.array
    })
};