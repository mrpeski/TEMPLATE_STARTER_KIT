var path = require("path");
module.exports = {
    project: {
        entry: {
            js: path.resolve(__dirname, './source/js/index.js'),
            front: path.resolve(__dirname, './source/scss/front.sass'),
            dash: path.resolve(__dirname, './source/scss/back.sass')
        },
        output: path.resolve(__dirname, './source/dist'),
    }
};
