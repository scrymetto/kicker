import React, {useState} from "react";
import makeAnimated from "react-select/animated";
import {makeFirstLetterUppercase} from "../../../helpers/makeFirstLetterUppercase";
import Select from "react-select";

export const CustomField_Select = ({className, classNamePrefix, options, name, initialValues, setFieldValue}) => {
    let [renderedValues, setRenderedValues] = useState([].concat(initialValues.map(value => {
        return value
            ? {value: value, label: makeFirstLetterUppercase(value)}
            : []
    })));

    const optionsWithLabel = options.map(i => {
        return {value: i, label: i}
    });

    const onSelectChange = (values) => {
        const validValues = values ? values : [];
        setRenderedValues(validValues);
        setFieldValue(name, validValues.map(value => value.value))
    };

    const animatedComponents = makeAnimated();
    return <Select
        className={className}
        classNamePrefix={classNamePrefix}
        options={optionsWithLabel}
        name={name}
        value={renderedValues}
        onChange={(values) => onSelectChange(values)}
        isMulti
        components={animatedComponents}
    />
};