const path = require("path");

module.exports = {
  entry: {
    js: "./assets/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./assets/js/build"),
    filename: "main.bundle.js",
    //publicPath: "/",
  },
  mode: "development",

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname),
      },
      {
        directory: path.resolve(__dirname, "./assets/css/"),
      },
    ],
    compress: true,
    port: 8080,
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
