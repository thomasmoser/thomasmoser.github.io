const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./assets/js/build"),
    filename: "main.bundle.js",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
  },
  devtool: "source-map",
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
