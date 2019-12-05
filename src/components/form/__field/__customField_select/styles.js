export const theme = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#38c1db',
        primary50: 'rgba(56,193,219, 0.5)',
        primary25: 'rgba(56,193,219, 0.25)',
        danger: '#f04e26',
        dangerLight: 'rgba(240,78,38, 0.5)'
    }
});

export const styles = {
    control: (prev) => ({
        ...prev,
        border: 'none',
        borderRadius: '5px',
        minHeight: '43px',
        maxHeight: '73px',
        minWidth: '278px',
        overflow: 'auto',
        boxSizing: 'border-box',
        fontFamily: 'IBM Plex Sans, sans-serif',
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
                color: 'white'
            }
    }),
    menu: (prev) => ({
        ...prev,
        marginTop: '3px',
    }),
    menuList: (prev)=>({
        ...prev,
        maxHeight: '300px'
    })
};