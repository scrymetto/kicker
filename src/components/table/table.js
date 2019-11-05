import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {makeFirstLetterUppercase} from "../../helpers/makeFirstLetterUppercase";

export const Table = (props) => {
    const {head, dataCells} = props;
    return <Fragment>
        <table>
            <thead>
            <tr>
                {head && head.map((cell, index) => {
                    let capital = makeFirstLetterUppercase(cell);
                    return <th key={index}>{capital}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {dataCells.map((data, index)=> {
                let capital = makeFirstLetterUppercase(data);
                return <td key={index}>{capital}</td>})}
            </tbody>
        </table>
    </Fragment>
};

Table.Proptypes = {
    head: PropTypes.arrayOf(PropTypes.string),
    dataCells: PropTypes.arrayOf(PropTypes.string).isRequired
};