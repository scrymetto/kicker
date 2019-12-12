import React, {useState} from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import {styles, theme} from "./styles";

export const CustomField_Select = ({className, classNamePrefix, options, name, initialValues, setFieldValue, placeholder, isSearchable, ...props}) => {

    const isMulti = Array.isArray(initialValues);

    let [renderedValues, setRenderedValues] = useState(isMulti
        ? [].concat(initialValues.map(value => {
            return value
                ? {value: value, label: value}
                : []
        }))
        : {value: initialValues, label: initialValues}
    );

    const optionsWithLabel = options.map(i => {
        return {value: i, label: i}
    });

    const onSelectChange = (values) => {
        let validValues;
        let valuesForState;
        if (isMulti) {
            validValues = values ? values : [];
            valuesForState = validValues.map(value => value.value)
        } else {
            validValues = values;
            valuesForState = values.value;
        }
        setFieldValue(name, valuesForState);
        setRenderedValues(validValues);
    };

    const animatedComponents = makeAnimated();

    return <Select
        {...props}
        className={className}
        classNamePrefix={classNamePrefix}
        options={optionsWithLabel}
        name={name}
        value={renderedValues}
        onChange={(values) => onSelectChange(values)}
        isMulti={isMulti}
        components={animatedComponents}
        styles={styles}
        theme={theme}
        placeholder={placeholder}
        isSearchable={isSearchable}
    />
};