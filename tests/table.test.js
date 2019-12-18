import React from 'react';
import {Table} from "../src/components/table/table";

const smallWrapper = string => <p>{string}</p>;
const germanDefiniteArticle = [
    {
        genus: smallWrapper('masculinum'),
        nominativ: smallWrapper('der'),
        genitiv: smallWrapper('des'),
        dativ: smallWrapper('dem'),
        akkusativ: smallWrapper('den')
    },
    {
        genus: smallWrapper('femininum'),
        nominativ: smallWrapper('die'),
        genitiv: smallWrapper('der'),
        dativ: smallWrapper('der'),
        akkusativ: smallWrapper('die')
    },
    {
        genus: smallWrapper('neutrum'),
        nominativ: smallWrapper('das'),
        genitiv: smallWrapper('des'),
        dativ: smallWrapper('dem'),
        akkusativ: smallWrapper('das')
    }
];
const color = {backgroundColor: 'yellow'};
const width = {width: '100px'};

const casesColumns = ['genus', 'nominativ', 'genitiv', 'dativ', 'akkusativ'];
const text = "English has only one version of the definite article - 'the'.";
const rowsStyles = new Array(germanDefiniteArticle.length);
rowsStyles[0] = color;
const columnsStyles = new Array(casesColumns.length);
columnsStyles[1] = color;
columnsStyles[3]=color;
columnsStyles[0] = width;
const styles = {rowsStyles: rowsStyles, columnsStyles: columnsStyles};

describe('<Table/> ', () => {
    let wrapper;
    const english = mount(<Table columns={casesColumns}
                                 text={text}/>);
    const deutsch = mount(<Table columns={casesColumns}
                                 rows={germanDefiniteArticle}
                                 styles={styles}/>);

    it('should render without problem', () => {
        wrapper = english;
        expect(wrapper.find('table').length).to.equal(1);
        wrapper = deutsch;
        expect(wrapper.find('table').length).to.equal(1);
    });

    it('should render the table with all rows, if they were in props', () => {
        wrapper = deutsch;
        const rows = wrapper.find('tr');
        expect(rows.length).to.equal(germanDefiniteArticle.length + 1) //all rows + 1 row for columns' names
    });

    it('should render one row, if <Table/> doesn\'t have \'row\' props', () => {
        wrapper = english;
        const row = wrapper.find('tr');
        expect(row.length).to.equal(2); //one row for broken heart + one row for columns' names
        expect(wrapper.find('[data-testid="emptyRow"]').props().colSpan).to.equal(casesColumns.length)
    });

    it('should return correct data in the cells', () => {
        wrapper = deutsch;
        const randomColumn = 3;
        const randomRow = 2;
        const cell = wrapper.find('tr').at(randomRow + 1) //find the row; +1 for row with columns' names
            .find('td').at(randomColumn); //find cell
        const dataCell = Object.values(germanDefiniteArticle[randomRow])[randomColumn];
        expect(cell.children().text()).to.equal(dataCell.props.children)
    });

    it('should return a <div> with the helper text, if there is the prop \'text\'', () => {
        wrapper = english;
        const tableText = wrapper.find('[data-testid="helperText"]').children().text();
        expect(tableText).to.equal(text);
        wrapper = deutsch;
        const noText = wrapper.find('[data-testid="helperText"]');
        expect(noText.length).to.equal(0)
    });

    it('should return cells with styles, if there is the prop \'style\'', () => {
        wrapper = deutsch;
        const randomCell = wrapper.find('th').at(0).getDOMNode();
        expect(getComputedStyle(randomCell).getPropertyValue('background-color')).to.equal('yellow');
        expect(getComputedStyle(randomCell).getPropertyValue('width')).to.equal('100px');
        const randomCell2 = wrapper.find('td').at(3).getDOMNode();
        expect(getComputedStyle(randomCell2).getPropertyValue('background-color')).to.equal('yellow');
        expect(getComputedStyle(randomCell2).getPropertyValue('width')).to.equal('');

    });

    it('should have empty prop \'styles\', if there is NO prop \'style\' in <Table/>', () => {
        wrapper = english;
        const randomCell = wrapper.find('th').at(0).props().style;
        expect(randomCell).to.be.empty; //it's normal, see https://www.chaijs.com/api/bdd/#method_empty
    })
});