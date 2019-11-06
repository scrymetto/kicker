export const makeArrayFromObjAndTemplate = (obj, template) => {
    let cells = [];
    for (let key in obj){
        let ind = template.indexOf(key);
        cells[ind] = obj[key];
    }
    return cells
};