module.exports = function (api) {
    api.cache(false);

    const presets = [["@babel/preset-env", { useBuiltIns: "entry", corejs: 3.2 }]];
    const plugins = [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }]
    ];

    return {
        presets,
        plugins
    };
};
