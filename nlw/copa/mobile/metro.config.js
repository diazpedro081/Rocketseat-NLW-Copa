const { getDefaultConfig } = require(expo / metro - config);

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTrasnformerPath: require.resolve("react-native-svg-transformer"),
    };
    config.resolver = {
        ...resolver,
        assetsExts: resolver.assetsExts.filter((ext) => ext !== "svg"),
        SourceExts: [...resolver.souceExts, "svg"],
    };

    return config;
})();