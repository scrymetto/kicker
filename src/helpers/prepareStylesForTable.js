export const prepareStylesForTable = (map) => {
    let styles = [];
    map.forEach((value, key) => {
        key.forEach(cell => {
            styles[cell] = styles[cell] ? Object.assign(styles[cell], value) : value
        })
    });
    return styles
};