var path = require("path");
var webpack = require("webpack");
var Dotenv = require("dotenv-webpack");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
var debug = process.env.NODE_ENV === "production";

module.exports = {
  context: path.join(__dirname, "/studio/src/"),
  entry: "./js/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|browser_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "react-html-attrs",
              [require("@babel/plugin-proposal-decorators"), { legacy: true }],
              "transform-class-properties",
            ],
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: ["last 2 versions", "safari > 8", "not ie < 11"],
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: __dirname + "/studio/static/studio/js/",
    filename: "main.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: debug
    ? [
        new HardSourceWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
        new Dotenv(),
      ]
    : [
        new HardSourceWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: true,
        }),
        new Dotenv(),
      ],
};
