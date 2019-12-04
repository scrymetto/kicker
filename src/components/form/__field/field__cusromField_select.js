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

    const styles = {
        control: (prev) => ({
            ...prev,
            border: 'none',
            borderRadius: '5px',
            minHeight: '43px',
            maxHeight: '73px',
            minWidth: '278px',
            overflow: 'auto',
            boxSizing: 'border-box',
        }),
        option: (prev) => ({
            ...prev,
            fontFamily: 'IBM Plex Sans, sans-serif'
        }),
        multiValue: (prev) => ({
            ...prev,
            borderRadius: '5px',
        }),
        multiValueLabel: (prev) => ({
            ...prev,
            fontSize: '18px',

        }),
        multiValueRemove: (prev) => ({
            ...prev,
            ':hover':
                {
                    backgroundColor: '#f04e26',
                    color:'white'
                }
        }),
    };

    const theme = theme => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: '#38c1db',
            primary50: 'rgba(56,193,219, 0.5)',
            primary25: 'rgba(56,193,219, 0.25)',
            danger:'#f04e26',
            dangerLight:'rgba(240,78,38, 0.5)'
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