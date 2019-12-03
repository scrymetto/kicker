import React, {useState} from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

export const CustomField_Select = ({className, classNamePrefix, options, name, initialValues, setFieldValue, placeholder}) => {

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
        console.log('onchange '+values)
        let validValues;
        let valuesForState;
        if (isMulti) {
            validValues = values ? values : [];
            valuesForState = validValues.map(value => value.value)
        } else {
            validValues = values;
            valuesForState = values.value;
        }
        setFieldValue(name, valuesForState)
        setRenderedValues(validValues);
    };

    const styles = {
        control: (prev) => ({
            ...prev,
            border: 'none',
            borderRadius: '5px',
            minHeight: '48px',
            maxHeight: '78px',
            overflow: 'auto',
            boxSizing: 'border-box',
        }),
        multiValue: (prev) => ({
            ...prev,
            // backgroundColor:'white',
            borderRadius: '5px',
        }),
        multiValueLabel: (prev) => ({
            ...prev,
            fontSize: '18px',

        }),
    };

    const theme = theme => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: '#38c1db',
            primary50: 'rgba(56,193,219, 0.5)',
            primary25: 'rgba(56,193,219, 0.25)',
            dangerLight: 'rgba(94,31,15, 0.1)'
        }
    });

    const animatedComponents = makeAnimated();
    return <Select
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
    />
};