// // config-overrides.js
// const webpack = require("webpack");

// module.exports = {
//   webpack: function (config, env) {
//     config.resolve.fallback = {
//       fs: false,
//       path: require.resolve("path-browserify"),
//       crypto: require.resolve("crypto-browserify"), // Add this line
//       stream: require.resolve("stream-browserify"),
//     };
//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         process: "process/browser",
//         Buffer: ["buffer", "Buffer"],
//       })
//     );
//     return config;
//   },
// };
