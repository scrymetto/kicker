export const prepareStylesForTable = (map) => {
    let styles = [];
    map.forEach((value, key) => {
        key.forEach(index => {
            let newStyle = value;
            styles[index] = styles[index] ? Object.assign(styles[index], newStyle) : Object.assign({}, newStyle);
        })
    });
    return styles
};
