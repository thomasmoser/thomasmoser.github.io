const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/app.js",
  },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "./assets/js/build"),
    //publicPath: "/",
  },
  mode: "development",

  devServer: {
    static: path.resolve(__dirname, "./"),
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
