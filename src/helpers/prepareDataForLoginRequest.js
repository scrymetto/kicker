export function prepareDataForLoginRequest (template, values) {
    let data = {};
    template.forEach(value => {
        data[value] = values[value]
    });
    return data
}