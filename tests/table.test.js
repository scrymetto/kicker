import React from 'react';
import {Table} from "../src/components/table/table";

const smallWrapper = string => <p>{string}</p>;
const germanCasesRows = [
    {
        genus: smallWrapper('masculinum'),
        nominativ: 'der',
        genitiv: 'des',
        dativ: 'dem',
        akkusativ: 'den'
    },
    {
        genus: smallWrapper('femininum'),
        nominativ: 'die',
        genitiv: 'der',
        dativ: 'der',
        akkusativ: 'die'
    },
    {
        genus: smallWrapper('neutrum'),
        nominativ: 'das',
        genitiv: 'des',
        dativ: 'dem',
        akkusativ: 'das'
    }
];
const casesColumns = ['Genus', 'Nominativ', 'Genitiv', 'Dativ', 'Akkusativ'];

describe('<Table/> ', () => {
    let wrapper;
    const english = mount(<Table columns={casesColumns}/>);
    const deutsch = mount(<Table columns={casesColumns} rows={germanCasesRows}/>);
    afterEach(() => {
        wrapper.unmount()
    });

    it('should render without problem', () => {
        wrapper = deutsch;
        console.log(wrapper.debug())
    });

});