const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Injects styles into DOM
          "css-loader", // 2. Turns CSS into common JS
          "sass-loader", // 1. Turns SASS into CSS
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 3. Injects styles into DOM
          "css-loader", // 2. Turns CSS into common JS
          "postcss-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 3001
  },
});
