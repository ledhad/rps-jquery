var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 1
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      //SCSS app.scss
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      //HTML index.html
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      //ASSETS
      {
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  devServer: {
    port: 9000,
    contentBase: "./dist"
  },
  plugins: [
    (extractPlugin = new MiniCssExtractPlugin({
      filename: "[name].css"
    })), //defined at the start of this file
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    // Provides jQuery for other JS bundled with Webpack
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
    // ,
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "/dist")]
    // })
  ]
};
