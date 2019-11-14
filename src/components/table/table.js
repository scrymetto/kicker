import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";
import {makeArrayFromObjAndTemplate} from "../../helpers/makeArrayFromObjAndTemplate";
import './table.css'

export const Table = (props) => {
    const {columns, rows, styles} = props;
    const rowsStylesMap = styles.columns;
    let rowsStyles = [];
    for (let key of rowsStylesMap.keys()){
        rowsStyles.push(key)
    }
    console.log(rowsStyles)
    return <Fragment>
        <table className='table'>
            <thead>
            <tr className='table table__columns'>
                {columns.map((cell, index) => {
                    let styles;
                    rowsStyles.forEach((array) =>{
                        if(array.includes(index)){
                            styles = rowsStylesMap.get(array)
                        }
                    });
                    console.log(styles)
                    let capital = makeFirstLetterUppercase(cell);
                    return <th key={index} style={styles} >{capital}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {rows
                ? rows.map((dataCells, index) => {
                    let row = makeArrayFromObjAndTemplate(dataCells, columns);
                    return <tr className='table table__rows' key={index}>
                        {row.map((cell, index) => {

                            return <td key={index}>{cell}</td>
                        })}
                    </tr>
                })
                : <tr>
                    <td colSpan={columns.length}>
                        &#128148;
                    </td>
                </tr>}
            </tbody>
        </table>
    </Fragment>
};

Table.Proptypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object)
};