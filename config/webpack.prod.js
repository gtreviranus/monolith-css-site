const path = require("path")
const merge = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const common = require("../webpack.common.js")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = merge(common(true), {
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    // Clean build/ directory before running Webpack
    new CleanWebpackPlugin(["../build"], {
      root: path.resolve(__dirname),
      verbose: true,
      allowExternal: true,
    }),

    // Create gzip compressed assets to be served by Express
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: "gzip",
    }),
  ],
  // No need for log vomit
  stats: { children: false },
  mode: "production",
})
