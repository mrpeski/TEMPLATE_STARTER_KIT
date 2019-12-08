export const arrToObj = (arr, key="id") => {
    let obj = {};
    arr.forEach(item => {
        obj[item[key]] = item;
    });
    return obj;
};

