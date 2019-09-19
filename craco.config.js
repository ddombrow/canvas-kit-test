const { addBeforeLoader, loaderByName } = require("@craco/craco");

const myNewWebpackLoader = {
  loader: require.resolve("wasm-loader")
};

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      addBeforeLoader(
        webpackConfig,
        loaderByName("babel-loader"),
        myNewWebpackLoader
      );
      return webpackConfig;
    }
  }
};
