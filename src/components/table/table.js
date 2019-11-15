import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";
import {makeArrayFromObjAndTemplate} from "../../helpers/makeArrayFromObjAndTemplate";
import './table.css'

export const Table = (props) => {
    const {columns, rows, styles} = props;
    // const columnsStylesMap = styles.columns;
    let columnsStyles = [];
    // for (let key of columnsStylesMap.keys()){
    //     columnsStyles.push(key)
    // }
    // console.log(columnsStyles)
    return <Fragment>
        <table className='table'>
            <thead>
            <tr className='table table__columns'>
                {columns.map((cell, index) => {
                    let stylesCell = {};
                    let capital = makeFirstLetterUppercase(cell);
                    return <th key={index} style={styles}>{capital}</th>
                })
                }
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