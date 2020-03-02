import React, {useState} from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import {createNewStyles, createTheme} from "./styles";

export const CustomField_Select = ({className, options, name, initialValues, setFieldValue, placeholder, isSearchable, ...props}) => {

    const isMulti = Array.isArray(initialValues);

    const [renderedValues, setRenderedValues] = useState(
        isMulti
            ? initialValues.map(value => {
                if (!value) return [];
                return value.label ? value : {value: value, label: value}
            })
            : initialValues.label
            ? initialValues
            : {value: initialValues, label: initialValues}
    );

    const optionsWithLabel = options.map(i => {
        return i.label
            ? i
            : {value: i, label: i}
    });

    const onSelectChange = (values) => {
        let validValues;
        if (isMulti) {
            validValues = values ? values : [];
        } else {
            validValues = values;
        }
        setFieldValue(name, validValues);
        setRenderedValues(validValues);
    };

    const animatedComponents = makeAnimated();

    return <Select
        data-testid='custom_select'
        className={className}
        classNamePrefix='form__field'
        options={optionsWithLabel}
        name={name}
        value={renderedValues}
        onChange={onSelectChange}
        isMulti={isMulti}
        components={animatedComponents}
        styles={createNewStyles}
        theme={createTheme}
        placeholder={placeholder}
        isSearchable={isSearchable}
        noOptionsMessage={() => <p className='text'>{props.noOptionText || 'No values available.'}</p>}
    />
};