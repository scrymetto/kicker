export function prepareDataForRequest (template, values) {
    let data = {};
    template.forEach(value => {
        data[value] = values[value]
    });
    return data
}